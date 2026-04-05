# 科研论文图表绘制完全指南

> 本章整理论文中常用的图表类型及其对应的工具和框架实现。

---

## 1. 论文常见图表类型

### 1.1 按功能分类

| 图表类型 | 用途 | 常见场景 |
|----------|------|----------|
| **折线图 (Line)** | 趋势变化 | 时间序列、训练曲线 |
| **柱状图 (Bar)** | 对比分析 | 方法对比、实验结果 |
| **散点图 (Scatter)** | 分布关系 | 数据分布、相关性 |
| **箱线图 (Box)** | 统计分布 | 性能对比、异常检测 |
| **热力图 (Heatmap)** | 矩阵可视化 | 相关性矩阵、注意力权重 |
| **饼图 (Pie)** | 占比分析 | 数据分布、类别比例 |
| **误差棒图 (Error Bar)** | 不确定性 | 带置信区间的结果 |
| **ROC曲线** | 分类性能 | 二分类、多分类评估 |
| **混淆矩阵** | 分类详情 | 模型评估 |
| **降维可视化** | 高维数据 | t-SNE、PCA 可视化 |

### 1.2 按领域分类

#### 机器学习 / 深度学习

| 图表 | 说明 |
|------|------|
| 训练曲线 | loss/accuracy 随 epoch 变化 |
| 学习率曲线 | LR 调度策略可视化 |
| 注意力权重热力图 | Attention 可视化 |
| Feature Map | 卷积层输出 |
| 网络架构图 | 模型结构示意图 |
| t-SNE/PCA | 嵌入向量可视化 |
| ROC/PR 曲线 | 分类评估 |
| 混淆矩阵 | 分类详细结果 |

#### 计算机视觉

| 图表 | 说明 |
|------|------|
| 图像分割结果 | Mask 可视化 |
| 目标检测结果 | Bounding Box 可视化 |
| 图像重建对比 | Before/After |
| 数据增强示例 | Augmentation 可视化 |
| PR 曲线 | 检测性能 |

#### 自然语言处理

| 图表 | 说明 |
|------|------|
| 注意力热力图 | Attention 权重 |
| 词云 | 关键词分布 |
|依存句法树 | 句法分析结果 |

#### 通用科学

| 图表 | 说明 |
|------|------|
| 实验结果对比 | 多方法柱状图 |
| 消融实验 | Ablation Study |
| 敏感性分析 | 参数影响曲线 |
| 统计显著性 | 带误差棒的柱状图 |

---

## 2. Python 图表框架

### 2.1 Matplotlib（基础库）

**Stars**: 19k+ | **用途**: 最基础的图表库

```python
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

# 基础折线图
plt.figure(figsize=(10, 6))
plt.plot(epochs, train_loss, label='Train Loss', linewidth=2)
plt.plot(epochs, val_loss, label='Val Loss', linewidth=2)
plt.xlabel('Epoch', fontsize=12)
plt.ylabel('Loss', fontsize=12)
plt.title('Training Curve', fontsize=14)
plt.legend()
plt.grid(True, alpha=0.3)
plt.savefig('training_curve.pdf', dpi=300, bbox_inches='tight')
```

**优点**: 完全控制、适配所有图表类型
**缺点**: 代码较繁琐

---

### 2.2 Seaborn（统计图表）

**Stars**: 13k+ | **用途**: 统计图表、漂亮默认样式

```python
import seaborn as sns
import pandas as pd

# 箱线图
df = pd.DataFrame({'Method': methods, 'Accuracy': accuracies})
sns.boxplot(x='Method', y='Accuracy', data=df, palette='Set2')
sns.swarmplot(x='Method', y='Accuracy', data=df, color='black')

# 热力图
sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', 
             center=0, fmt='.2f')
```

**优点**: 漂亮的默认样式、简单的统计图表
**缺点**: 自定义程度有限

---

### 2.3 Plotly（交互图表）

**Stars**: 16k+ | **用途**: 交互图表、Dash 仪表盘

```python
import plotly.graph_objects as go

# 3D 散点图
fig = go.Figure(data=[go.Scatter3d(
    x=embeddings[:, 0],
    y=embeddings[:, 1],
    z=embeddings[:, 2],
    mode='markers',
    marker=dict(size=5, color=labels, colorscale='Viridis')
)])
fig.show()

# ROC 曲线
fig = go.Figure()
for name, fpr, tpr in results:
    fig.add_trace(go.Scatter(x=fpr, y=tpr, name=name))
fig.add_trace(go.Scatter(x=[0, 1], y=[0, 1], 
                    line=dict(dash='dash'), name='Random'))
fig.update_layout(title='ROC Curves', xaxis_title='FPR', yaxis_title='TPR')
```

**优点**: 交互、导出 HTML/SVG、3D 支持
**缺点**: 论文中需截图或转为静态

---

### 2.4 Altair（声明式）

**Stars**: 4k+ | **用途**: 简洁的声明式语法

```python
import altair as alt
import pandas as pd

# 绑状图
chart = alt.Chart(df).mark_bar().encode(
    x='Method:N',
    y='Accuracy:Q',
    color='Method:N'
).properties(title='Method Comparison')
chart.save('chart.json')
```

**优点**: 简洁、声明式、数据变换集成
**缺点**: 语法学习曲线

---

### 2.5 Mayavi（3D 科学可视化）

**Stars**: 1.4k+ | **用途**: 3D 科学数据

```python
from mayavi import mlab

# 3D 标量场
x, y, z = np.mgrid[-5:5:100j, -5:5:100j, -5:5:100j]
r = np.sqrt(x**2 + y**2 + z**2)
scalar = np.sin(r) / (r + 0.001)
mlab.pipeline.volume_scalar_field(scalar)
mlab.savefig('volume.pdf')
```

**优点**: 专业的 3D 科学可视化
**缺点**: 安装复杂、文档有限

---

### 2.6 PyQtGraph（高速图表）

**Stars**: 4.3k+ | **用途**: 实时数据、Qt 集成

```python
import pyqtgraph as pg

# 实时曲线
plt = pg.plot()
curve = plt.plot()
while True:
    curve.setData(new_data)
```

**优点**: 高速实时渲染、Qt 集成
**缺点**: 主要用于 GUI 应用

---

## 3. 论文专用工具

### 3.1 Science Plots（发表级样式）

```python
# 安装: pip install scienceplots
import matplotlib.pyplot as plt
import scienceplots

# 使用 IEEE/ Science 样式
plt.style.use(['science', 'ieee', 'no-latex'])
# 或
plt.style.use(['science', 'nature'])

# 导出高分辨率
plt.savefig('figure.pdf', dpi=300)
plt.savefig('figure.png', dpi=600, format='png')
```

**支持的样式**:
- `science` - 默认科学样式
- `nature` - Nature 期刊样式
- `ieee` - IEEE 期刊样式
- `plos` - PLOS 期刊样式

---

### 3.2 Matplotlib Latex（论文排版）

```python
import matplotlib
matplotlib.rcParams['text.usetex'] = True
matplotlib.rcParams['font.family'] = 'serif'
matplotlib.rcParams['font.serif'] = ['Times New Roman']

# 使用 Latex 渲染公式
plt.xlabel(r'$\epsilon_{max}$')
plt.title(r'$\beta = \frac{\alpha}{\gamma}$')
```

---

### 3.3 PyLaTeX（代码生成 LaTeX 表格）

```python
from pylatex import Tabular, Table, Document

doc = Document()
with doc.create(Table()) as table:
    table.add_caption('Experimental Results')
    with table.create(Tabular('ccc')) as tabular:
        tabular.add_hline()
        tabular.add_row(('Method', 'Accuracy', 'F1'))
        tabular.add_hline()
        for method, acc, f1 in results:
            tabular.add_row((method, f'{acc:.2f}', f'{f1:.2f}'))
        tabular.add_hline()
doc.generate_pdf('table')
```

---

## 4. 神经网络可视化专用

### 4.1 PlotNeuralNet（Latex 代码）

**GitHub**: 24.5k Stars

```bash
# 安装
git clone https://github.com/HarisIqbal88/PlotNeuralNet.git
cd PlotNeuralNet
pip install -e .
```

```python
from PlotNeuralNet import pycore as io
from PlotNeuralNet.Plot import ResNet

# 生成 ResNet 架构图
io.save()
```

---

### 4.2 Netron（网络架构可视化）

**GitHub**: 29k Stars | **支持**: ONNX, TensorFlow, PyTorch 等

```bash
# 安装
pip install netron

# 启动
python -m netron
# 或
netron model.onnx
```

---

### 4.3 torchviz（PyTorch 计算图）

```python
import torchviz

# 可视化计算图
model = MyModel()
x = torch.randn(1, 3, 224, 224)
y = model(x)
torchviz.make_dot(y, params=dict(model.named_parameters())).render('model')
```

---

### 4.4 TensorBoard（训练监控）

```bash
# 启动
tensorboard --logdir=runs
```

```python
from torch.utils.tensorboard import SummaryWriter

writer = SummaryWriter('runs/experiment')
writer.add_scalar('Loss/train', loss, epoch)
writer.add_scalar('Loss/val', val_loss, epoch)
writer.add_images('Input', images, epoch)
```

---

## 5. 特殊图表类型

### 5.1 注意力权重热力图

```python
import seaborn as sns
import numpy as np

# 注意力权重热力图
attention = np.random.rand(12, 12)  # 12 head, 12 layer
sns.heatmap(attention, cmap='viridis', annot=False,
            xticklabels=12, yticklabels=12)
plt.xlabel('Key Tokens')
plt.ylabel('Query Tokens')
plt.title('Attention Weights')
```

### 5.2 t-SNE / PCA 可视化

```python
from sklearn.manifold import TSNE
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt

# 降维可视化
embeddings_2d = TSNE(n_components=2).fit_transform(embeddings)

plt.figure(figsize=(10, 8))
scatter = plt.scatter(embeddings_2d[:, 0], embeddings_2d[:, 1], 
                     c=labels, cmap='tab10', s=50)
plt.colorbar(scatter)
plt.title('t-SNE Visualization')
```

### 5.3 ROC / PR 曲线

```python
from sklearn.metrics import roc_curve, auc, precision_recall_curve

# ROC 曲线
fpr, tpr, _ = roc_curve(y_true, y_score)
roc_auc = auc(fpr, tpr)

plt.figure()
plt.plot(fpr, tpr, label=f'ROC (AUC = {roc_auc:.3f})')
plt.plot([0, 1], [0, 1], 'k--')
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.legend()
```

### 5.4 混淆矩阵

```python
from sklearn.metrics import confusion_matrix
import seaborn as sns

cm = confusion_matrix(y_true, y_pred)
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
            xticklabels=classes, yticklabels=classes)
plt.xlabel('Predicted')
plt.ylabel('True')
```

---

## 6. 配色方案

### 6.1 常用配色库

| 库 | 说明 |
|-----|------|
| **viridis** | 色盲友好、黑白打印友好 |
| **coolwarm** | 发散型数据 |
| **tab10** | 分类数据、10色 |
| **Set2** | 柔和配色 |
| **Paired** | 成对数据 |

### 6.2 色盲友好配色

```python
# 使用色盲友好的配色
plt.style.use('seaborn-v0_8-colorblind')

# 或手动设置
colors = ['#0173b2', '#de8f05', '#029e73', '#cc78bc', 
          '#ca9161', '#949494', '#ece133', '#56b4e9']
```

### 6.3 期刊配色

```python
# Nature 风格
NATURE_COLORS = ['#E64B35', '#4DBBD5', '#00A087', '#3C5488',
                  '#F39B7F', '#8491B4', '#91D1C2', '#DC0000']

# Science 风格
SCIENCE_COLORS = ['#3B4992', '#EE0000', '#008B45', '#631879',
                   '#008280', '#BB0021', '#5F559B', '#A20056']
```

---

## 7. 导出设置

### 7.1 论文级导出

```python
# 设置高质量导出
plt.rcParams.update({
    'font.family': 'Times New Roman',
    'font.size': 10,
    'axes.labelsize': 10,
    'axes.titlesize': 12,
    'legend.fontsize': 9,
    'xtick.labelsize': 9,
    'ytick.labelsize': 9,
    'figure.dpi': 300,
    'savefig.dpi': 300,
    'savefig.bbox': 'tight',
    'savefig.pad_inches': 0.05
})

# 导出多种格式
plt.savefig('figure.pdf')  # 矢量格式，优先
plt.savefig('figure.png', format='png', dpi=600)  # 高清位图
plt.savefig('figure.svg')  # 可编辑矢量
```

### 7.2 透明背景

```python
plt.savefig('figure.pdf', transparent=True, 
            bbox_inches='tight', pad_inches=0)
```

---

## 8. 最佳实践

### 8.1 图表设计原则

| 原则 | 说明 |
|------|------|
| **简洁** | 删除不必要的元素 |
| **清晰** | 坐标轴标签清晰可读 |
| **一致性** | 同类型图表风格统一 |
| **色盲友好** | 避免红绿组合 |
| **高对比度** | 确保打印后清晰 |

### 8.2 字体大小

```python
# 论文标准字体大小
TITLE_SIZE = 14
AXIS_LABEL_SIZE = 11
TICK_SIZE = 9
LEGEND_SIZE = 9
CAPTION_SIZE = 10
```

### 8.3 分辨率

| 用途 | 格式 | DPI |
|------|------|-----|
| 期刊论文 | PDF/SVG | 300+ |
| 会议论文 | PDF | 300 |
| 演示幻灯片 | PNG | 150 |
| 网页/博客 | PNG | 72-150 |
| 打印海报 | PDF | 600+ |

---

## 9. 工具推荐总结

| 图表类型 | 推荐工具 |
|----------|----------|
| 通用图表 | Matplotlib + Seaborn |
| 交互图表 | Plotly |
| 统计图表 | Seaborn |
| 3D 可视化 | Mayavi, Plotly |
| 网络架构 | Netron, PlotNeuralNet |
| 训练监控 | TensorBoard |
| 论文样式 | Science Plots |
| 表格 | PyLaTeX, Pandas |

---

_本章整理了科研论文中常用的图表类型及对应的 Python 工具和框架，帮助你选择合适的工具绘制专业的论文图表。_
