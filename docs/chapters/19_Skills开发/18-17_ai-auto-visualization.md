# AI 自动可视化生成系统

> 本章介绍如何构建一个"输入文章，输出图表"的端到端 AI 可视化系统。

---

## 1. 系统架构

### 1.1 核心组件

```
auto-visualizer/
├── auto_viz.py           # 主程序
├── chart_selector.py      # 图表选择器
├── param_extractor.py     # 参数提取器
├── code_generator.py      # 代码生成器
├── renderers/            # 渲染器
│   ├── matplotlib_renderer.py
│   ├── plotly_renderer.py
│   ├── mermaid_renderer.py
│   └── echarts_renderer.py
└── prompts/              # 提示词库
    ├── analysis_prompt.txt
    ├── selection_prompt.txt
    └── code_prompt.txt
```

---

## 2. 数据提取器

### 2.1 核心逻辑

```python
"""
auto_viz/data_extractor.py

从文本中提取可视化所需的数据和结构
"""

import re
import json
from typing import Dict, List, Any, Optional
from dataclasses import dataclass, field


@dataclass
class ExtractedData:
    """提取的数据结构"""
    # 原始数据
    raw_data: List[Dict] = field(default_factory=list)
    
    # 数据类型识别
    data_types: Dict[str, str] = field(default_factory=dict)  # field -> type
    
    # 实体列表
    entities: List[str] = field(default_factory=list)
    
    # 关系列表
    relations: List[tuple] = field(default_factory=list)
    
    # 时间序列（如果有）
    time_series: Dict[str, List] = field(default_factory=dict)
    
    # 分类变量
    categories: Dict[str, List] = field(default_factory=dict)
    
    # 数值变量
    numerical: Dict[str, List] = field(default_factory=dict)
    
    # 主题描述
    theme: str = ""
    
    # 关键洞察
    insights: List[str] = field(default_factory=list)


class DataExtractor:
    """从文本中提取可视化数据"""
    
    # 数据类型模式
    TYPE_PATTERNS = {
        'percentage': r'(\d+\.?\d*)%',
        'currency': r'[\$¥€£]?\s*[\d,]+\.?\d*',
        'integer': r'\b\d{1,10}\b',
        'float': r'\b\d+\.\d+\b',
        'date': r'\d{4}[-/]\d{1,2}[-/]\d{1,2}',
        'year': r'\b(19|20)\d{2}\b',
        'month': r'(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)',
    }
    
    # 数值字段关键词
    NUMBER_KEYWORDS = [
        '增长', '下降', '增加', '减少', '数量', '金额', '比例',
        'percentage', 'growth', 'increase', 'decrease', 'amount',
        'sales', 'revenue', 'profit', 'cost', 'price', 'value'
    ]
    
    # 分类字段关键词
    CATEGORY_KEYWORDS = [
        '类型', '类别', '国家', '城市', '公司', '产品',
        'type', 'category', 'country', 'city', 'company', 'product'
    ]
    
    def extract(self, text: str) -> ExtractedData:
        """主提取方法"""
        result = ExtractedData()
        
        # 1. 提取原始数据
        result.raw_data = self._extract_tables(text)
        
        # 2. 识别数据类型
        result.data_types = self._identify_types(text)
        
        # 3. 提取数值数据
        result.numerical = self._extract_numerical(text)
        
        # 4. 提取分类数据
        result.categories = self._extract_categories(text)
        
        # 5. 提取时间序列
        result.time_series = self._extract_time_series(text)
        
        # 6. 提取实体关系
        result.entities, result.relations = self._extract_entities(text)
        
        # 7. 理解主题
        result.theme = self._extract_theme(text)
        
        # 8. 提取关键洞察
        result.insights = self._extract_insights(text)
        
        return result
    
    def _extract_tables(self, text: str) -> List[Dict]:
        """从文本中提取表格数据"""
        tables = []
        
        # Markdown 表格
        md_pattern = r'\|(.+)\|\n\|[-:\s|]+\|\n((?:\|.+\|\n)+)'
        matches = re.findall(md_pattern, text)
        for header_match, data_match in matches:
            headers = [h.strip() for h in header_match.split('|') if h.strip()]
            rows = []
            for line in data_match.strip().split('\n'):
                cells = [c.strip() for c in line.split('|')[1:-1]]
                if len(cells) == len(headers):
                    row = dict(zip(headers, cells))
                    rows.append(row)
            if rows:
                tables.append({'type': 'markdown', 'headers': headers, 'rows': rows})
        
        # CSV 格式
        csv_pattern = r'([\w\s,]+)\n((?:\d[.\d,]*(?:,|\n))+'
        # 简化处理
        
        # JSON 数据块
        json_pattern = r'\[\s*\{[^}]+\}\s*\]'
        json_matches = re.findall(json_pattern, text, re.DOTALL)
        for json_str in json_matches:
            try:
                data = json.loads(json_str)
                if isinstance(data, list) and len(data) > 0:
                    tables.append({'type': 'json', 'data': data})
            except:
                pass
        
        return tables
    
    def _identify_types(self, text: str) -> Dict[str, str]:
        """识别数据类型"""
        types = {}
        
        for pattern_name, pattern in self.TYPE_PATTERNS.items():
            matches = re.findall(pattern, text, re.IGNORECASE)
            if matches:
                types[pattern_name] = matches[:10]  # 最多10个样本
        
        return types
    
    def _extract_numerical(self, text: str) -> Dict[str, List]:
        """提取数值型数据"""
        numerical = {}
        
        # 查找 "X: 数值" 模式
        kv_pattern = r'([\w\u4e00-\u9fa5]+)\s*[:：]\s*([\d,]+\.?\d*)'
        matches = re.findall(kv_pattern, text)
        
        for key, value in matches:
            # 清理
            key = key.strip()
            try:
                num_value = float(value.replace(',', ''))
                if key not in numerical:
                    numerical[key] = []
                numerical[key].append(num_value)
            except:
                pass
        
        return numerical
    
    def _extract_categories(self, text: str) -> Dict[str, List]:
        """提取分类数据"""
        categories = {}
        
        # 提取列表项
        list_items = re.findall(r'^\s*[-*]\s*(.+)$', text, re.MULTILINE)
        if list_items:
            categories['items'] = list_items[:20]
        
        # 提取编号列表
        numbered = re.findall(r'^\s*\d+[.、]\s*(.+)$', text, re.MULTILINE)
        if numbered:
            categories['numbered'] = numbered[:20]
        
        return categories
    
    def _extract_time_series(self, text: str) -> Dict[str, List]:
        """提取时间序列"""
        time_series = {}
        
        # 查找年份数据
        years = re.findall(r'\b(19|20)\d{2}\b', text)
        if years:
            unique_years = []
            for y in years:
                if y not in unique_years:
                    unique_years.append(y)
            time_series['years'] = unique_years
        
        # 查找月份数据
        months = re.findall(r'(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)', text, re.I)
        if months:
            time_series['months'] = months[:12]
        
        return time_series
    
    def _extract_entities(self, text: str) -> tuple:
        """提取实体和关系"""
        entities = []
        relations = []
        
        # 简单实体识别（实际应用中用 NER 模型更好）
        # 识别人名
        names = re.findall(r'([A-Z][a-z]+ [A-Z][a-z]+)', text)
        entities.extend(names[:10])
        
        # 识别公司/组织
        orgs = re.findall(r'([A-Z][\w\s]+(?:公司|集团|组织|机构))', text)
        entities.extend(orgs[:10])
        
        # 识别关系（简化版）
        # "A 和 B" -> 相关
        and_pattern = r'([\w\u4e00-\u9fa5]+)\s*(?:和|与|以及|,)\s*([\w\u4e00-\u9fa5]+)'
        for match in re.finditer(and_pattern, text):
            relations.append((match.group(1), '相关', match.group(2)))
        
        # "A 属于 B"
        belong_pattern = r'([\w\u4e00-\u9fa5]+)\s*(?:属于|属于|是)\s*([\w\u4e00-\u9fa5]+)'
        for match in re.finditer(belong_pattern, text):
            relations.append((match.group(1), '属于', match.group(2)))
        
        return list(set(entities)), relations
    
    def _extract_theme(self, text: str) -> str:
        """理解主题（简化版）"""
        # 取前200字作为主题描述
        theme = text[:200].strip()
        # 移除多余空白
        theme = re.sub(r'\s+', ' ', theme)
        return theme
    
    def _extract_insights(self, text: str) -> List[str]:
        """提取关键洞察"""
        insights = []
        
        # 查找包含洞察的句子
        insight_patterns = [
            r'发现[:：](.+)',
            r'表明[:：](.+)',
            r'显示[:：](.+)',
            r'显示(.+)增长',
            r'显示(.+)下降',
            r'最高[:：]?(\d+)',
            r'最多[:：]?(\d+)',
        ]
        
        for pattern in insight_patterns:
            matches = re.findall(pattern, text)
            insights.extend(matches[:5])
        
        return insights[:10]
```

---

## 3. 图表选择器

### 3.1 核心逻辑

```python
"""
auto_viz/chart_selector.py

根据数据特征自动选择最合适的图表类型
"""

from enum import Enum
from typing import List, Dict, Any, Optional
from dataclasses import dataclass


class ChartType(Enum):
    """图表类型枚举"""
    # 通用
    LINE = "line"
    BAR = "bar"
    PIE = "pie"
    SCATTER = "scatter"
    AREA = "area"
    
    # 统计
    HISTOGRAM = "histogram"
    BOX = "box"
    VIOLIN = "violin"
    HEATMAP = "heatmap"
    
    # 关系
    NETWORK = "network"
    SANKEY = "sankey"
    CHORD = "chord"
    
    # 层次
    TREEMAP = "treemap"
    SUNBURST = "sunburst"
    
    # 地理
    MAP = "map"
    CHOROPLETH = "choropleth"
    
    # 流程/结构
    FLOWCHART = "flowchart"
    MINDMAP = "mindmap"
    ORGCHART = "orgchart"
    
    # 文本
    WORDCLOUD = "wordcloud"
    
    # 金融
    CANDLESTICK = "candlestick"
    
    # 组合
    COMPOSITE = "composite"


@dataclass
class SelectionResult:
    """选择结果"""
    primary_chart: ChartType
    alternative_charts: List[ChartType]
    reasoning: str
    mapping: Dict[str, str]  # 字段 -> 视觉通道
    confidence: float  # 0-1


class ChartSelector:
    """图表选择器"""
    
    # 数据维度 -> 推荐的图表类型
    DIMENSION_CHART_MAP = {
        # 单变量
        ('1', 'categorical'): [ChartType.PIE, ChartType.BAR],
        ('1', 'numerical'): [ChartType.HISTOGRAM, ChartType.BOX, ChartType.VIOLIN],
        ('1', 'text'): [ChartType.WORDCLOUD],
        
        # 双变量
        ('2', 'numerical+numerical'): [ChartType.SCATTER, ChartType.LINE],
        ('2', 'numerical+categorical'): [ChartType.BAR, ChartType.BOX],
        ('2', 'categorical+categorical'): [ChartType.HEATMAP, ChartType.BAR],
        
        # 时间序列
        ('time', 'numerical'): [ChartType.LINE, ChartType.AREA],
        ('time', 'categorical'): [ChartType.BAR],
        
        # 多维
        ('multi', 'mixed'): [ChartType.SCATTER, ChartType.PARALLEL],
        
        # 层次
        ('hierarchical',): [ChartType.TREEMAP, ChartType.SUNBURST],
        
        # 关系
        ('network',): [ChartType.NETWORK, ChartType.SANKEY],
        
        # 地理
        ('geographical',): [ChartType.MAP, ChartType.CHOROPLETH],
    }
    
    # 视觉通道选择规则
    CHANNEL_RULES = {
        'x': ['numerical', 'time', 'categorical'],
        'y': ['numerical'],
        'color': ['categorical', 'numerical'],
        'size': ['numerical'],
        'shape': ['categorical'],
        'opacity': ['numerical'],
        'label': ['any'],
    }
    
    def select(self, data: Dict[str, Any]) -> SelectionResult:
        """主选择方法"""
        
        # 1. 分析数据维度
        dimensions = self._analyze_dimensions(data)
        
        # 2. 确定数据类型组合
        type_combo = self._get_type_combo(dimensions)
        
        # 3. 查找推荐图表
        candidates = self._find_candidates(type_combo)
        
        # 4. 排序并选择
        ranked = self._rank_charts(candidates, data)
        
        # 5. 生成映射
        mapping = self._generate_mapping(ranked[0], dimensions)
        
        return SelectionResult(
            primary_chart=ranked[0],
            alternative_charts=ranked[1:4],
            reasoning=self._explain_selection(ranked[0], dimensions),
            mapping=mapping,
            confidence=0.85
        )
    
    def _analyze_dimensions(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """分析数据维度"""
        dimensions = {
            'count': 0,
            'types': [],
            'has_time': False,
            'has_category': False,
            'has_numerical': False,
            'has_network': False,
            'has_geo': False,
        }
        
        # 从数据结构分析
        if isinstance(data, dict):
            for key, value in data.items():
                if isinstance(value, list):
                    dimensions['count'] = max(dimensions['count'], len(value))
                    
                    # 分析类型
                    if all(isinstance(v, (int, float)) for v in value if v is not None):
                        dimensions['has_numerical'] = True
                        dimensions['types'].append('numerical')
                    elif all(isinstance(v, str) for v in value):
                        dimensions['has_category'] = True
                        dimensions['types'].append('categorical')
        
        # 从元数据获取
        if 'time_series' in data and data['time_series']:
            dimensions['has_time'] = True
        if 'categories' in data and data['categories']:
            dimensions['has_category'] = True
        if 'numerical' in data and data['numerical']:
            dimensions['has_numerical'] = True
        if 'relations' in data and data['relations']:
            dimensions['has_network'] = True
        
        return dimensions
    
    def _get_type_combo(self, dims: Dict) -> tuple:
        """确定数据类型组合"""
        
        # 时间序列
        if dims['has_time'] and dims['has_numerical']:
            return ('time', 'numerical')
        
        # 关系网络
        if dims['has_network']:
            return ('network',)
        
        # 层次结构
        if dims.get('has_hierarchical'):
            return ('hierarchical',)
        
        # 地理数据
        if dims['has_geo']:
            return ('geographical',)
        
        # 多维数据
        if dims['count'] >= 3:
            return ('multi', 'mixed')
        
        # 双变量
        if dims['count'] == 2:
            types = set(dims['types'])
            if 'numerical' in types and len(types) == 1:
                return ('2', 'numerical+numerical')
            elif 'numerical' in types:
                return ('2', 'numerical+categorical')
            else:
                return ('2', 'categorical+categorical')
        
        # 单变量
        if dims['count'] == 1:
            if dims['types']:
                return ('1', dims['types'][0])
        
        return ('1', 'categorical')
    
    def _find_candidates(self, type_combo: tuple) -> List[ChartType]:
        """查找候选图表"""
        candidates = []
        
        for pattern, charts in self.DIMENSION_CHART_MAP.items():
            if self._match_combo(type_combo, pattern):
                candidates.extend(charts)
        
        # 默认回退
        if not candidates:
            candidates = [ChartType.BAR, ChartType.LINE]
        
        return list(set(candidates))
    
    def _match_combo(self, combo: tuple, pattern: tuple) -> bool:
        """匹配类型组合"""
        if len(pattern) != len(combo):
            return False
        
        for c, p in zip(combo, pattern):
            if p == 'any' or p == 'mixed':
                continue
            if p not in c:
                return False
        
        return True
    
    def _rank_charts(self, candidates: List[ChartType], data: Dict) -> List[ChartType]:
        """对候选图表排序"""
        # 简单实现：基于数据特征和图表通用性排序
        
        # 优先级
        priority = {
            ChartType.LINE: 10,
            ChartType.BAR: 9,
            ChartType.PIE: 7,
            ChartType.SCATTER: 8,
            ChartType.HEATMAP: 6,
            ChartType.HISTOGRAM: 5,
            ChartType.BOX: 4,
            ChartType.NETWORK: 3,
            ChartType.TREEMAP: 3,
            ChartType.WORDCLOUD: 2,
        }
        
        return sorted(candidates, key=lambda c: priority.get(c, 5), reverse=True)
    
    def _generate_mapping(self, chart: ChartType, dims: Dict) -> Dict[str, str]:
        """生成视觉通道映射"""
        mapping = {}
        
        # 基于图表类型生成默认映射
        if chart in [ChartType.LINE, ChartType.BAR]:
            if dims['has_time']:
                mapping['x'] = 'time'
                mapping['y'] = 'value'
            else:
                mapping['x'] = 'category'
                mapping['y'] = 'value'
        
        elif chart == ChartType.SCATTER:
            mapping['x'] = 'numerical_1'
            mapping['y'] = 'numerical_2'
            if dims['has_category']:
                mapping['color'] = 'category'
        
        elif chart == ChartType.PIE:
            mapping['label'] = 'category'
            mapping['value'] = 'value'
        
        elif chart == ChartType.HEATMAP:
            mapping['x'] = 'dim_1'
            mapping['y'] = 'dim_2'
            mapping['color'] = 'value'
        
        elif chart == ChartType.NETWORK:
            mapping['node'] = 'entity'
            mapping['edge'] = 'relation'
        
        elif chart == ChartType.WORDCLOUD:
            mapping['text'] = 'word'
            mapping['size'] = 'frequency'
        
        return mapping
    
    def _explain_selection(self, chart: ChartType, dims: Dict) -> str:
        """解释选择理由"""
        explanations = {
            ChartType.LINE: "检测到时间序列数据，折线图最适合展示趋势变化",
            ChartType.BAR: "适合比较不同类别之间的数值差异",
            ChartType.PIE: "适合展示各部分占总体的比例关系",
            ChartType.SCATTER: "适合展示两个数值变量之间的相关性",
            ChartType.HEATMAP: "适合展示矩阵形式的数据分布",
            ChartType.HISTOGRAM: "适合展示单个数值变量的分布情况",
            ChartType.BOX: "适合展示数值变量的统计特征（中位数、四分位等）",
            ChartType.NETWORK: "检测到实体关系，网络图适合展示复杂的关联",
            ChartType.TREEMAP: "适合展示层次结构数据的包含关系",
            ChartType.WORDCLOUD: "适合展示文本数据的关键词分布",
        }
        
        return explanations.get(chart, "基于数据特征选择")
```

---

## 4. 代码生成器

### 4.1 主生成器

```python
"""
auto_viz/code_generator.py

根据图表类型和数据生成可视化代码
"""

from abc import ABC, abstractmethod
from typing import Dict, Any, Optional
import json


class CodeGenerator(ABC):
    """代码生成器基类"""
    
    @abstractmethod
    def generate(self, chart_type: str, data: Dict, config: Dict) -> str:
        """生成代码"""
        pass
    
    def get_language(self) -> str:
        return "python"
    
    def get_output_format(self) -> str:
        return "png"


class MatplotlibGenerator(CodeGenerator):
    """Matplotlib 代码生成"""
    
    STYLE_TEMPLATES = {
        'paper': {
            'figsize': '(7, 5)',
            'dpi': 300,
            'font_family': 'serif',
            'font_size': 10,
            'line_width': 1.5,
            'color_palette': 'Greys',
        },
        'presentation': {
            'figsize': '(12, 8)',
            'dpi': 150,
            'font_family': 'sans-serif',
            'font_size': 14,
            'line_width': 2.5,
            'color_palette': 'Set2',
        },
        'dashboard': {
            'figsize': '(10, 6)',
            'dpi': 100,
            'font_family': 'sans-serif',
            'font_size': 12,
            'line_width': 2,
            'color_palette': 'husl',
        },
    }
    
    CHART_CODE = {
        'line': '''
import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('Agg')

# 设置样式
plt.rcParams['font.family'] = '{font_family}'
plt.rcParams['font.size'] = {font_size}
plt.rcParams['figure.figsize'] = {figsize}
plt.rcParams['figure.dpi'] = {dpi}

# 数据
x = {x_data}
y = {y_data}
labels = {labels}

# 绘图
fig, ax = plt.subplots()
{extra_params}

ax.set_xlabel('{xlabel}')
ax.set_ylabel('{ylabel}')
ax.set_title('{title}')
ax.legend()
ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('{output}', dpi={dpi}, bbox_inches='tight')
print("图表已保存: {output}")
''',

        'bar': '''
import matplotlib.pyplot as plt
import numpy as np
import matplotlib
matplotlib.use('Agg')

plt.rcParams['font.family'] = '{font_family}'
plt.rcParams['font.size'] = {font_size}

fig, ax = plt.subplots(figsize={figsize}, dpi={dpi})

categories = {categories}
values = {values}
colors = plt.cm.{color_palette}(np.linspace(0, 1, len(categories)))

bars = ax.bar(categories, values, color=colors{extra_style})
ax.set_xlabel('{xlabel}')
ax.set_ylabel('{ylabel}')
ax.set_title('{title}')
{extra_params}

plt.tight_layout()
plt.savefig('{output}', dpi={dpi}, bbox_inches='tight')
print("图表已保存: {output}")
''',

        'scatter': '''
import matplotlib.pyplot as plt
import numpy as np
import matplotlib
matplotlib.use('Agg')

plt.rcParams['font.family'] = '{font_family}'
plt.rcParams['font.size'] = {font_size}

fig, ax = plt.subplots(figsize={figsize}, dpi={dpi})

x = {x_data}
y = {y_data}
sizes = {sizes} if {sizes} else 100
colors = plt.cm.{color_palette}(np.linspace(0, 1, len(x)))

scatter = ax.scatter(x, y, s=sizes, c=colors, alpha=0.6{extra_style})
ax.set_xlabel('{xlabel}')
ax.set_ylabel('{ylabel}')
ax.set_title('{title}')
plt.colorbar(scatter, label='{colorbar_label}')
{extra_params}

plt.tight_layout()
plt.savefig('{output}', dpi={dpi}, bbox_inches='tight')
print("图表已保存: {output}")
''',

        'heatmap': '''
import matplotlib.pyplot as plt
import numpy as np
import matplotlib
matplotlib.use('Agg')

plt.rcParams['font.family'] = '{font_family}'
plt.rcParams['font.size'] = {font_size}

fig, ax = plt.subplots(figsize={figsize}, dpi={dpi})

data = np.array({matrix_data})
row_labels = {row_labels}
col_labels = {col_labels}

im = ax.imshow(data, cmap='{cmap}', aspect='auto')
ax.set_xticks(np.arange(len(col_labels)))
ax.set_yticks(np.arange(len(row_labels)))
ax.set_xticklabels(col_labels)
ax.set_yticklabels(row_labels)
plt.colorbar(im, label='{colorbar_label}')
{extra_params}

for i in range(len(row_labels)):
    for j in range(len(col_labels)):
        text = ax.text(j, i, f'{{data[i, j]:.1f}}',
                       ha="center", va="center", color="black", fontsize=8)

plt.tight_layout()
plt.savefig('{output}', dpi={dpi}, bbox_inches='tight')
print("图表已保存: {output}")
''',
    }
    
    def generate(self, chart_type: str, data: Dict, config: Dict) -> str:
        """生成 Matplotlib 代码"""
        
        style = config.get('style', 'paper')
        style_params = self.STYLE_TEMPLATES.get(style, self.STYLE_TEMPLATES['paper'])
        
        # 获取模板
        template = self.CHART_CODE.get(chart_type, self.CHART_CODE['bar'])
        
        # 填充模板
        code = template.format(
            **style_params,
            **data,
            **config,
            title=config.get('title', '图表标题'),
            xlabel=config.get('xlabel', ''),
            ylabel=config.get('ylabel', ''),
            output=config.get('output', 'output.png'),
            extra_params=config.get('extra_params', ''),
            extra_style=config.get('extra_style', ''),
        )
        
        return code
    
    def get_language(self) -> str:
        return "python"
    
    def get_output_format(self) -> str:
        return "png/pdf"


class PlotlyGenerator(CodeGenerator):
    """Plotly 代码生成"""
    
    def generate(self, chart_type: str, data: Dict, config: Dict) -> str:
        """生成 Plotly 代码"""
        
        code = f'''
import plotly.express as px
import plotly.io as pio
import json

# 数据
data = {json.dumps(data.get('raw_data', data), ensure_ascii=False, indent=8)}

# 配置
title = "{config.get('title', '图表标题')}"
output = "{config.get('output', 'output.html')}"

# 根据类型生成图表
chart_type = "{chart_type}"

if chart_type == "line":
    fig = px.line(data, x="{data.get('x_field', 'x')}", y="{data.get('y_field', 'y')}", 
                   title=title, {self._get_facets(data)})

elif chart_type == "bar":
    fig = px.bar(data, x="{data.get('x_field', 'x')}", y="{data.get('y_field', 'y')}",
                  title=title, {self._get_color_param(data)})

elif chart_type == "scatter":
    fig = px.scatter(data, x="{data.get('x_field', 'x')}", y="{data.get('y_field', 'y')}",
                      size="{data.get('size_field', '')}" if "{data.get('size_field', '')}" else None,
                      color="{data.get('color_field', '')}" if "{data.get('color_field', '')}" else None,
                      title=title, hover_data={data.get('hover_fields', [])})

elif chart_type == "pie":
    fig = px.pie(data, names="{data.get('name_field', 'name')}", 
                  values="{data.get('value_field', 'value')}", title=title)

elif chart_type == "heatmap":
    fig = px.imshow(data["{data.get('matrix_field', 'matrix')}"], 
                     x={data.get('col_labels', [])},
                     y={data.get('row_labels', [])},
                     title=title)

elif chart_type == "treemap":
    fig = px.treemap(data, names="{data.get('name_field', 'name')}",
                      parents="{data.get('parent_field', 'parent')}",
                      values="{data.get('value_field', 'value')}", title=title)

else:
    # 默认散点图
    fig = px.scatter(data, x="{data.get('x_field', 'x')}", y="{data.get('y_field', 'y')}", title=title)

# 更新布局
fig.update_layout(
    font_family="Arial",
    font_size=12,
    title_font_size=16,
    plot_bgcolor="white",
    paper_bgcolor="white",
)

# 保存
if output.endswith('.html'):
    fig.write_html(output)
else:
    fig.write_image(output, width=1200, height=800, scale=2)

print(f"图表已保存: {{output}}")
'''
        return code
    
    def _get_facets(self, data: Dict) -> str:
        if 'facet_field' in data:
            return f"facet_col=\"{data['facet_field']}\""
        return ""
    
    def _get_color_param(self, data: Dict) -> str:
        if 'color_field' in data:
            return f"color=\"{data['color_field']}\""
        return "color='steelblue'"
    
    def get_language(self) -> str:
        return "python"
    
    def get_output_format(self) -> str:
        return "html/png"


class MermaidGenerator(CodeGenerator):
    """Mermaid 代码生成"""
    
    def generate(self, chart_type: str, data: Dict, config: Dict) -> str:
        """生成 Mermaid 代码"""
        
        if chart_type == 'flowchart':
            return self._generate_flowchart(data, config)
        elif chart_type == 'mindmap':
            return self._generate_mindmap(data, config)
        elif chart_type == 'sequence':
            return self._generate_sequence(data, config)
        elif chart_type == 'gantt':
            return self._generate_gantt(data, config)
        else:
            return self._generate_flowchart(data, config)
    
    def _generate_flowchart(self, data: Dict, config: Dict) -> str:
        direction = config.get('direction', 'TD')
        nodes = data.get('nodes', [])
        edges = data.get('edges', [])
        
        code = f'''```mermaid
flowchart {direction}
'''
        for node in nodes:
            node_id = node.get('id', 'node')
            node_label = node.get('label', node_id)
            node_shape = node.get('shape', '')
            
            if node_shape == 'diamond':
                code += f'    {node_id}{{{node_label}}}\n'
            elif node_shape == 'rounded':
                code += f'    ({node_label})\n'
            elif node_shape == 'stadium':
                code += f'    ({node_label})\n'
            else:
                code += f'    {node_id}[{node_label}]\n'
        
        for edge in edges:
            from_node = edge.get('from', 'A')
            to_node = edge.get('to', 'B')
            label = edge.get('label', '')
            style = edge.get('style', '--')
            
            if label:
                code += f'    {from_node} {style}|{label}| {to_node}\n'
            else:
                code += f'    {from_node} --> {to_node}\n'
        
        code += '```'
        return code
    
    def _generate_mindmap(self, data: Dict, config: Dict) -> str:
        root = config.get('root', '中心主题')
        branches = data.get('branches', [])
        
        code = f'''```mermaid
mindmap
  root(( {root} ))
'''
        for branch in branches:
            branch_name = branch.get('name', '分支')
            children = branch.get('children', [])
            
            code += f'    {branch_name}\n'
            for child in children:
                code += f'      {child}\n'
        
        code += '```'
        return code
    
    def _generate_sequence(self, data: Dict, config: Dict) -> str:
        participants = data.get('participants', [])
        messages = data.get('messages', [])
        
        code = '''```mermaid
sequenceDiagram
'''
        for p in participants:
            code += f'    participant {p}\n'
        
        for msg in messages:
            from_p = msg.get('from', 'A')
            to_p = msg.get('to', 'B')
            text = msg.get('text', '')
            msg_type = msg.get('type', '->>')
            
            code += f'    {from_p}{msg_type}{to_p}: {text}\n'
        
        code += '```'
        return code
    
    def _generate_gantt(self, data: Dict, config: Dict) -> str:
        tasks = data.get('tasks', [])
        
        code = '''```mermaid
gantt
    title {title}
    dateFormat YYYY-MM-DD
'''
        for task in tasks:
            name = task.get('name', 'Task')
            start = task.get('start', '2024-01-01')
            duration = task.get('duration', '7d')
            done = task.get('done', 0)
            
            if done > 0:
                code += f'    {name}: done, {name}{done}, {start}, {duration}\n'
            else:
                code += f'    {name}: {name}, {start}, {duration}\n'
        
        code += '```'
        return code
    
    def get_language(self) -> str:
        return "mermaid"
    
    def get_output_format(self) -> str:
        return "svg"


class EChartsGenerator(CodeGenerator):
    """ECharts 代码生成"""
    
    def generate(self, chart_type: str, data: Dict, config: Dict) -> str:
        """生成 ECharts 配置"""
        
        config_json = {
            'title': {'text': config.get('title', '图表标题')},
            'tooltip': {'trigger': 'axis'},
            'legend': {'data': []},
            'xAxis': {'type': 'category', 'data': data.get('x_data', [])},
            'yAxis': {'type': 'value'},
            'series': []
        }
        
        series_map = {
            'line': {'type': 'line'},
            'bar': {'type': 'bar'},
            'scatter': {'type': 'scatter'},
            'pie': {
                'type': 'pie',
                'radius': '50%',
                'data': []
            }
        }
        
        if chart_type == 'pie':
            config_json['xAxis'] = {}
            config_json['yAxis'] = {}
            for i, name in enumerate(data.get('categories', [])):
                config_json['series'][0]['data'].append({
                    'value': data['values'][i],
                    'name': name
                })
        else:
            for i, values in enumerate(data.get('series', [[]])):
                series_config = series_map.get(chart_type, series_map['bar']).copy()
                series_config['data'] = values
                series_config['name'] = data.get('series_names', ['数据'])[i]
                config_json['series'].append(series_config)
                config_json['legend']['data'].append(data.get('series_names', ['数据'])[i])
        
        html_template = f'''<!DOCTYPE html>
<html style="height: 100%">
<head>
    <meta charset="utf-8">
    <title>{config.get('title', '图表')}</title>
    <script src="https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js"></script>
</head>
<body style="height: 100%; margin: 0">
    <div id="main" style="height: 100%"></div>
    <script>
        var chart = echarts.init(document.getElementById('main'));
        var option = {json.dumps(config_json, ensure_ascii=False, indent=4)};
        chart.setOption(option);
        window.onresize = chart.resize;
    </script>
</body>
</html>'''
        
        return html_template
    
    def get_language(self) -> str:
        return "javascript"
    
    def get_output_format(self) -> str:
        return "html"
```

---

## 5. 主程序

### 5.1 自动可视化主程序

```python
#!/usr/bin/env python3
"""
auto_viz/auto_viz.py

AI 自动可视化生成主程序

用法:
    python auto_viz.py --input article.txt --style paper --output chart.png
    python auto_viz.py --input article.txt --interactive
"""

import argparse
import json
import sys
import os
from pathlib import Path

# 导入模块
from data_extractor import DataExtractor
from chart_selector import ChartSelector, ChartType
from code_generator import MatplotlibGenerator, PlotlyGenerator, MermaidGenerator, EChartsGenerator


class AutoVisualizer:
    """AI 自动可视化生成器"""
    
    def __init__(self):
        self.extractor = DataExtractor()
        self.selector = ChartSelector()
        
        # 注册生成器
        self.generators = {
            'matplotlib': MatplotlibGenerator(),
            'plotly': PlotlyGenerator(),
            'mermaid': MermaidGenerator(),
            'echarts': EChartsGenerator(),
        }
        
        # 默认生成器
        self.default_generator = 'matplotlib'
    
    def process(self, input_text: str, 
                style: str = 'paper',
                output: str = 'output.png',
                framework: str = None,
                interactive: bool = False) -> str:
        """
        处理输入文本，生成可视化
        
        Args:
            input_text: 输入文本
            style: 样式风格 (paper/presentation/dashboard)
            output: 输出文件路径
            framework: 指定框架 (matplotlib/plotly/mermaid/echarts)
            interactive: 是否交互模式
            
        Returns:
            生成的代码或文件路径
        """
        
        # 1. 提取数据
        print("📊 步骤 1: 分析文本，提取数据...")
        extracted = self.extractor.extract(input_text)
        
        if interactive:
            print("\n📋 提取的数据概览:")
            print(f"  - 数值字段: {list(extracted.numerical.keys())}")
            print(f"  - 分类字段: {list(extracted.categories.keys())}")
            print(f"  - 时间序列: {list(extracted.time_series.keys())}")
            print(f"  - 实体数量: {len(extracted.entities)}")
            print(f"  - 关系数量: {len(extracted.relations)}")
        
        # 2. 选择图表
        print("\n🎯 步骤 2: 选择最合适的图表类型...")
        selection = self.selector.select(extracted.__dict__)
        
        print(f"  - 推荐图表: {selection.primary_chart.value}")
        print(f"  - 备选图表: {[c.value for c in selection.alternative_charts]}")
        print(f"  - 选择理由: {selection.reasoning}")
        print(f"  - 置信度: {selection.confidence:.0%}")
        
        if interactive:
            # 允许用户选择
            print("\n请选择图表类型:")
            print("1. 使用推荐的图表")
            print("2. 选择备选图表")
            print("3. 手动指定")
            choice = input("请输入选择 (1/2/3): ").strip()
            
            if choice == '2' and selection.alternative_charts:
                idx = 1
                for i, alt in enumerate(selection.alternative_charts, 1):
                    print(f"  {i+1}. {alt.value}")
                alt_choice = input("请选择 (1-3): ").strip()
                if alt_choice.isdigit():
                    idx = int(alt_choice) - 1
                    if 0 <= idx < len(selection.alternative_charts):
                        selection.primary_chart = selection.alternative_charts[idx]
            elif choice == '3':
                chart_input = input("请输入图表类型: ").strip().lower()
                try:
                    selection.primary_chart = ChartType(chart_input)
                except:
                    print("无效的图表类型，使用默认推荐")
        
        # 3. 确定框架
        if framework is None:
            # 根据图表类型自动选择
            framework = self._auto_select_framework(selection.primary_chart)
        
        generator = self.generators.get(framework, self.generators[self.default_generator])
        
        print(f"\n🔧 步骤 3: 使用 {framework} 生成代码...")
        
        # 4. 准备数据
        data = self._prepare_data(extracted, selection)
        config = {
            'style': style,
            'output': output,
            'title': extracted.theme[:50] if len(extracted.theme) > 50 else extracted.theme,
            'xlabel': 'X 轴',
            'ylabel': 'Y 轴',
        }
        
        # 5. 生成代码
        code = generator.generate(selection.primary_chart.value, data, config)
        
        print(f"\n📝 生成的代码:\n")
        print(code[:500] if len(code) > 500 else code)
        print("...")
        
        # 6. 执行代码
        print(f"\n⚙️  步骤 4: 执行代码，生成图表...")
        
        if generator.get_language() == 'mermaid':
            # Mermaid 代码直接输出
            output_file = output.replace(Path(output).suffix, '.md')
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(code)
            print(f"✅ Mermaid 代码已保存: {output_file}")
            return output_file
        else:
            # 执行 Python 代码
            exec_globals = {'__name__': '__main__'}
            exec(code, exec_globals)
            
            print(f"✅ 图表已生成: {output}")
            return output
    
    def _auto_select_framework(self, chart_type: ChartType) -> str:
        """根据图表类型自动选择框架"""
        
        # 关系/层次图表 -> Mermaid
        if chart_type in [ChartType.FLOWCHART, ChartType.MINDMAP, ChartType.ORGCHART]:
            return 'mermaid'
        
        # 需要交互 -> Plotly 或 ECharts
        if chart_type in [ChartType.SCATTER, ChartType.BOX, ChartType.VIOLIN]:
            return 'plotly'
        
        # 大屏 -> ECharts
        # (实际应用中可添加更多逻辑)
        
        # 默认 -> Matplotlib
        return 'matplotlib'
    
    def _prepare_data(self, extracted, selection) -> Dict:
        """准备生成器所需的数据格式"""
        
        data = {}
        
        # 从 extracted 转换数据
        if extracted.numerical:
            # 取第一个数值字段作为示例
            first_key = list(extracted.numerical.keys())[0]
            data['values'] = extracted.numerical[first_key][:20]
            data['x_data'] = list(range(len(data['values'])))
            data['y_data'] = data['values']
            data['xlabel'] = '索引'
            data['ylabel'] = first_key
        
        if extracted.categories:
            first_key = list(extracted.categories.keys())[0]
            data['categories'] = extracted.categories[first_key][:10]
            data['labels'] = data['categories']
        
        if extracted.time_series:
            if 'years' in extracted.time_series:
                data['x_data'] = extracted.time_series['years']
        
        # 从 selection.mapping 获取字段映射
        mapping = selection.mapping
        data.update(mapping)
        
        return data


def main():
    parser = argparse.ArgumentParser(description='AI 自动可视化生成')
    parser.add_argument('--input', '-i', required=True, help='输入文件或文本')
    parser.add_argument('--output', '-o', default='output.png', help='输出文件')
    parser.add_argument('--style', '-s', default='paper', 
                        choices=['paper', 'presentation', 'dashboard'],
                        help='样式风格')
    parser.add_argument('--framework', '-f', 
                        choices=['matplotlib', 'plotly', 'mermaid', 'echarts'],
                        help='指定框架')
    parser.add_argument('--interactive', action='store_true', help='交互模式')
    parser.add_argument('--text', '-t', help='直接输入文本')
    
    args = parser.parse_args()
    
    # 读取输入
    if args.text:
        input_text = args.text
    elif os.path.isfile(args.input):
        with open(args.input, 'r', encoding='utf-8') as f:
            input_text = f.read()
    else:
        input_text = args.input
    
    # 创建可视化器并运行
    viz = AutoVisualizer()
    result = viz.process(
        input_text=input_text,
        style=args.style,
        output=args.output,
        framework=args.framework,
        interactive=args.interactive
    )
    
    print(f"\n🎉 完成! 结果: {result}")


if __name__ == '__main__':
    main()
```

---

## 6. 使用示例

### 6.1 基本使用

```bash
# 从文件生成
python auto_viz.py --input article.txt --style paper --output chart.png

# 交互模式
python auto_viz.py --input article.txt --interactive

# 指定框架
python auto_viz.py --input article.txt --framework plotly --output chart.html
```

### 6.2 作为 Skill 调用

```markdown
# auto-visualize-skill

## 触发词
"自动画图", "生成图表", "可视化", "auto visualize"

## 使用方法
```
## 触发条件
当用户提供文章或数据，希望生成可视化图表时

## 执行流程
1. 调用 auto_viz.py 处理文本
2. 自动分析数据结构和类型
3. 选择最合适的图表
4. 生成代码并执行
5. 返回图表

## 输出格式
支持: PNG, PDF, SVG, HTML
```

## 示例

用户: "帮我分析这篇文章的销售数据并生成图表"

Assistant:
```
# 分析文章
[提取销售数据: Q1:100, Q2:150, Q3:120, Q4:180]

# 选择图表类型
检测到时间序列数据，推荐使用折线图

# 生成图表
[调用 auto_viz.py 生成图表]

# 输出
图表已保存: sales_chart.png
```
```

### 6.3 示例文章

```markdown
## 输入示例文章

# 2024年智能手机市场分析

根据最新数据显示，全球智能手机市场份额分布如下：

- 三星: 22%
- 苹果: 18%
- 小米: 12%
- OPPO: 10%
- vivo: 9%
- 其他: 29%

各季度增长率：
Q1: 5.2%
Q2: 7.8%
Q3: 6.5%
Q4: 8.3%

从发展趋势来看，高端机型占比逐年上升，中低端市场竞争激烈。
```

```bash
# 处理这篇分析文章
python auto_viz.py --input smartphone_analysis.txt --style presentation

# 输出
📊 步骤 1: 分析文本，提取数据...
  - 数值字段: ['quarter_growth']
  - 分类字段: ['brands']
  - 时间序列: ['quarters']

🎯 步骤 2: 选择最合适的图表类型...
  - 推荐图表: bar (柱状图)
  - 备选图表: ['pie', 'line']
  - 选择理由: 检测到分类数据和数值数据，柱状图最适合比较

🔧 步骤 3: 使用 matplotlib 生成代码...
📝 生成的代码:
...

⚙️ 步骤 4: 执行代码，生成图表...
✅ 图表已生成: output.png
```

---

## 7. 扩展方向

### 7.1 支持更多图表类型

```python
# 在 chart_selector.py 中添加
'3d': [ChartType.SURFACE, ChartType.SCATTER3D],  # 3D 图表
'geo': [ChartType.MAP, ChartType.CHOROPLETH],     # 地理图表
'financial': [ChartType.CANDLESTICK, ChartType.OHLC],  # 金融图表
```

### 7.2 集成 LLM 增强

```python
# 使用 GPT-4 增强参数选择
from langchain import OpenAI

llm = OpenAI(temperature=0)

# LLM 分析文本生成配置
prompt = f"""
分析以下文本，提取可视化所需信息：

文本内容：
{input_text}

请提取：
1. 数据类型（数值/分类/时间）
2. 数据关系（趋势/比较/构成/分布）
3. 推荐的图表类型
4. 建议的视觉映射
5. 标题和标签建议
"""

response = llm(prompt)
config = json.loads(response)
```

### 7.3 支持更多输入格式

```python
# PDF 输入
import PyPDF2

def extract_from_pdf(pdf_path: str) -> str:
    with open(pdf_path, 'rb') as f:
        reader = PyPDF2.PdfReader(f)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
    return text

# Excel 输入
import pandas as pd

def extract_from_excel(excel_path: str) -> pd.DataFrame:
    return pd.read_excel(excel_path)
```

---

## 8. 完整文件结构

```
auto_visualizer/
├── __init__.py
├── auto_viz.py              # 主程序
├── data_extractor.py        # 数据提取
├── chart_selector.py        # 图表选择
├── code_generator.py         # 代码生成（包含所有框架）
├── prompts/                 # 提示词
│   ├── analysis_prompt.txt
│   ├── selection_prompt.txt
│   └── code_prompt.txt
└── README.md                # 使用说明
```

---

_本章介绍了如何构建一个端到端的 AI 自动可视化系统，从文章输入到图表输出的完整流程。_
