import React, { useState, useEffect } from 'react';
import {
  Activity, ScanLine, Sparkles, ChevronRight, CheckCircle2,
  Baby, BatteryWarning, HeartPulse, CalendarClock, ShoppingCart,
  Calculator, Coffee, Package, Stethoscope, Sun, Shirt, ThermometerSun,
  Home, Zap, Bot, BookOpen, Utensils, Gift, CloudRain, Briefcase,
  Moon, Map as MapIcon, FileText, Users, Timer, Pill, ArrowRight, TrendingDown,
  Dumbbell, Flame, Trophy, Mic, MessageCircle, Phone, Camera, Mail, BatteryMedium, Wifi, ShoppingBag, Calendar
} from 'lucide-react';

// ==========================================
// 1. 数据配置：20个全场景 (已嵌入您上传的真实商品图片)
// ==========================================
const SCENARIOS = {
  fitness: [
    {
      id: 'ft1', tagIcon: Package, tagText: '耗材预警', tagLabel: '剩约 2-3 颗', title: '尤尼克斯 AS-9 快打完了', color: 'rose',
      aiReason: '场馆打卡同步：本月已完成 6 场高强度羽毛球双打。按每场正常损耗估算，您上次买的这筒球已消耗 85%。',
      visualType: 'progress', progressName: 'YONEX AS-9 比赛级羽毛球 (12只装)', progressPercent: 85,
      image: 'image_6fbe92.jpg', // 替换为真实的羽毛球图片
      productName: 'YONEX AS-9 羽毛球 12只装', productPrice: '115', productDesc: '已为您匹配常买的飞行速度 77 适用款',
      actionText: '右滑 补货羽毛球', doneText: '羽毛球已下单，同城次日达', icon: ShoppingCart
    },
    {
      id: 'ft2', tagIcon: Flame, tagText: '装备损耗', tagLabel: '大底磨损', title: '羽毛球鞋抓地力下降，建议换新', color: 'rose',
      aiReason: '运动健康同步:这双 65Z3 已累计高强度实战超 120 小时。频繁急停变向导致前掌大底严重磨损，为防滑防扭伤建议换新。',
      visualType: 'timeline', timelineLeft: '新鞋下地 0h', timelineRight: '实战 120h (建议退役)',
      image: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=400&q=80',
      pip: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=200&q=80',
      productName: 'YONEX 65Z3 宽楦羽毛球鞋', productPrice: '880', productDesc: '您的常穿尺码 38 码有现货',
      actionText: '右滑 升级新款球鞋', doneText: '新战靴已发货', icon: ShoppingCart
    },
    {
      id: 'ft3', tagIcon: MapIcon, tagText: '场地预订', tagLabel: '常规馆满场', title: '奥体今晚满场，已锁定备选球馆', color: 'rose',
      aiReason: '定位与场地预订系统：您常去的【奥体羽毛球馆】今晚 19:00 已满场。为您检索并锁定了附近 3 公里内有空场的备选球馆。',
      visualType: 'map', mapLeft: '奥体中心(满场)', mapRight: '全民星(有空场)',
      image: 'https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?auto=format&fit=crop&w=400&q=80',
      productName: '全民星羽毛球馆 2小时VIP场', productPrice: '120', productDesc: '木地板弹性好，防眩光灯光',
      actionText: '右滑 一键预订备选场馆', doneText: '场地已订，19:00见', icon: Activity
    },
    {
      id: 'ft4', tagIcon: Utensils, tagText: '营养摄入', tagLabel: '高耗能周', title: '双练消耗大，优质碳水与蛋白告急', color: 'rose',
      aiReason: '饮食管家：本周「力量训练+羽毛球」双练耗能极大，冰箱里的优质碳水与高蛋白食材已耗尽。已为您组合健康餐包。',
      visualType: 'math', mathTopLabel: '当前冰箱优质食材', mathTopValue: '严重不足',
      mathMiddleIcon: Package, mathMiddleLabel: '凑单：生食三文鱼+贝贝南瓜', mathMiddleValue: '+ ¥ 129',
      mathBottomLabel: '完美契合增肌与体能恢复', mathBottomValue: '营养达标',
      mathFooterText: '正好覆盖未来 3 天高强度训练', mathOriginalPrice: '', mathFinalPrice: '¥ 129',
      actionText: '右滑 一键采买健康食材', doneText: '冷链极速达已接单', icon: ShoppingCart
    },
    {
      id: 'ft5', tagIcon: Sparkles, tagText: '康复预防', tagLabel: '肩部疲劳', title: '体态与伤病预防：肩袖肌群疲劳预警', color: 'rose',
      aiReason: '训练分析：近期羽毛球杀球发力频繁，结合力量训练中的推举动作，右侧肩袖肌群压力过大。建议加入肩带稳定性训练。',
      visualType: 'doc', docName: '肩袖激活与伤病预防指南.pdf', docDesc: '包含弹力带外旋与胸大肌拉伸',
      actionText: '右滑 同步至手表与日历', doneText: '新计划已同步至所有设备', icon: BookOpen
    }
  ],
  young: [
    {
      id: 'y2', tagIcon: Briefcase, tagText: '行程预警', tagLabel: '4月20日 北京', title: '出差遇雨，需要防水外套吗？', color: 'violet',
      aiReason: '携程订单显示您后天飞北京。预报有雨，推荐防风防水的职场外套。',
      visualType: 'image', image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=400&q=80',
      productName: 'UR 纳米防水通勤风衣', productPrice: '399', productDesc: '轻薄便携，适合商旅',
      actionText: '右滑 购买出差装备', doneText: '风衣已发货', icon: CloudRain
    },
    {
      id: 'y3', tagIcon: Gift, tagText: '社交送礼', tagLabel: '好友生日', title: '闺蜜 Lisa 生日还有 3 天', color: 'violet',
      aiReason: '分析她的浏览记录，最近关注香氛。推荐这款经典套装，绝不出错。',
      visualType: 'image', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=400&q=80',
      productName: 'Jo Malone 经典香水礼盒', productPrice: '399', productDesc: '附赠生日贺卡与精美包装',
      actionText: '右滑 购买并代写贺卡', doneText: '礼物已打包，贺卡已生成', icon: Gift
    },
    {
      id: 'y4', tagIcon: Shirt, tagText: '衣橱盘点', tagLabel: '气温回暖', title: '天气热了，你缺几件春装', color: 'violet',
      aiReason: '虚拟衣橱显示你有7件厚外套，但只有1件薄款。未来一周15-25度，为您搭配了春装组合。',
      visualType: 'image', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80',
      productName: '基础白T恤 + 冰丝防晒衫', productPrice: '178', productDesc: '直播间同款打包价',
      actionText: '右滑 一键买齐春装', doneText: '衣物已发货', icon: Shirt
    },
    {
      id: 'y5', tagIcon: BatteryWarning, tagText: '日耗品复购', tagLabel: '将近空瓶', title: '洗发水快用完了，今晚买划算', color: 'violet',
      aiReason: '结合家庭4口人推算，3个月前买的500ml洗发水即将用完。今晚直播间买2送1，比上次便宜¥40。',
      visualType: 'image', image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=400&q=80',
      productName: '卡诗 根源洗发水 500ml', productPrice: '210', productDesc: '直播间专享：买2送1',
      actionText: '右滑 趁直播低价囤货', doneText: '已为您抢占直播间名额', icon: Package
    },
    {
      id: 'y1', tagIcon: ShoppingCart, tagText: '购物车优化', tagLabel: '满800减50', title: '加购咖啡，总价反而更低', color: 'violet',
      aiReason: '购物车差¥42即可触发满减。加一盒您常买的挂耳咖啡，白拿咖啡还省1块钱。',
      visualType: 'math', mathTopLabel: '当前购物车 (2件)', mathTopValue: '¥ 758',
      mathMiddleIcon: Coffee, mathMiddleLabel: '凑单：常买的咖啡', mathMiddleValue: '+ ¥ 49',
      mathBottomLabel: '触发满减规则', mathBottomValue: '- ¥ 50',
      mathFooterText: '白拿一盒咖啡，还省1块钱', mathOriginalPrice: '¥ 758', mathFinalPrice: '¥ 757',
      actionText: '右滑 加入凑单并结算', doneText: '已成功触发满减并付款', icon: Calculator
    }
  ],
  mom: [
    {
      id: 'm1', tagIcon: Baby, tagText: '库存预警', tagLabel: '剩余可用 约2天', title: '宝宝纸尿裤即将耗尽', color: 'cyan',
      aiReason: '基于每日 5 片用量推算。上次购买 80片装 是 14天前。',
      visualType: 'progress', progressName: '帮宝适 80片装 (L码)', progressPercent: 90,
      image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=400&q=80',
      productName: '帮宝适 一级帮 L码 80片', productPrice: '129', productDesc: '已锁定同款。明天上午即可送达。',
      actionText: '右滑 授权补货', doneText: '已自动续订，明天送达', icon: Package
    },
    {
      id: 'm2', tagIcon: CalendarClock, tagText: '成长阶段', tagLabel: '满7个月', title: '宝宝该添加辅食了', color: 'cyan',
      aiReason: '从首次购买纸尿裤推算，宝宝已满7个月。推荐吸盘辅食碗，防打翻更省心。',
      visualType: 'image', image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=400&q=80',
      pip: 'https://images.unsplash.com/photo-1620021305452-f4722bd45e69?auto=format&fit=crop&w=200&q=80',
      productName: 'BcBabycare 硅胶吸盘辅食碗', productPrice: '59', productDesc: '当前母婴主播正在试用讲解',
      actionText: '右滑 购买辅食碗', doneText: '已下单，发往家庭地址', icon: Utensils
    },
    {
      id: 'm3', tagIcon: TrendingDown, tagText: '尺码升级', tagLabel: '换季生长', title: '宝宝长高了，该换100码了', color: 'cyan',
      aiReason: '检测到最近一单裤子买了100码（之前都是90码）。夏天快到了，为您优选100码夏装。',
      visualType: 'image', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=400&q=80',
      productName: '纯棉透气短袖套装 100码', productPrice: '159', productDesc: '历史购买尺码自动更新',
      actionText: '右滑 买入夏装套装', doneText: '已下单 100码 套装', icon: Shirt
    },
    {
      id: 'm4', tagIcon: Sun, tagText: '季节防护', tagLabel: '天气变热', title: '天气变热，宝宝需要防晒', color: 'cyan',
      aiReason: '5月起紫外线指数升高。8个月宝宝皮肤娇嫩，为您推荐物理防晒霜。',
      visualType: 'image', image: 'image_6fbd7b.jpg', // 替换为真实的安热沙防晒图片
      productName: '安热沙 婴儿纯物理防晒乳', productPrice: '129', productDesc: '无添加，清水可卸',
      actionText: '右滑 购买宝宝防晒霜', doneText: '防晒霜已发货', icon: Sun
    },
    {
      id: 'm5', tagIcon: Pill, tagText: '换季囤货', tagLabel: '流感高发', title: '秋季流感易发期，建议备药', color: 'cyan',
      aiReason: '记录显示去年9月您买过此款小儿感冒颗粒，评价"很管用"。又到换季，建议囤一盒以备不时之需。',
      visualType: 'image', image: 'image_6fba51.jpg', // 替换为真实的小儿氨酚颗粒图片
      productName: '小儿氨酚黄那敏颗粒', productPrice: '29', productDesc: '非处方药，家庭常备',
      actionText: '右滑 囤货感冒药', doneText: '已放入家庭药箱清单发货', icon: Pill
    }
  ],
  family: [
    {
      id: 'f1', tagIcon: HeartPulse, tagText: '亲情长记性', tagLabel: '年度提醒', title: '父亲该做年度体检了', color: 'emerald',
      aiReason: '父亲去年5月做了体检。一年期已到，该预约年度复查了。',
      visualType: 'timeline', timelineLeft: '去年 5月', timelineRight: '今年 5月 (现在)',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=400&q=80',
      productName: '中老年深度体检套餐', productPrice: '599', productDesc: '已匹配同款，含重点心脑血管筛查',
      actionText: '右滑 为父亲复购同款', doneText: '已购入，凭短信直接预约', icon: Stethoscope
    },
    {
      id: 'f2', tagIcon: Activity, tagText: '健康补充', tagLabel: '体检关联', title: '体检后补充些营养', color: 'emerald',
      aiReason: '体检预约成功。去年您买过的汤臣倍健蛋白粉对长辈恢复很好，需要再来一罐吗？',
      visualType: 'image', image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=400&q=80',
      productName: '中老年乳清蛋白粉', productPrice: '89', productDesc: '送货至父亲常住地址',
      actionText: '右滑 购入营养品', doneText: '蛋白粉已下单', icon: Activity
    },
    {
      id: 'f3', tagIcon: Gift, tagText: '节日筹备', tagLabel: '中秋倒计时', title: '给公公婆婆的伴手礼月饼准备了吗？', color: 'emerald',
      aiReason: '中秋节还有2周。基于去年您的购买偏好，为您找了同品牌的今年新款礼盒。',
      visualType: 'image', image: 'https://images.unsplash.com/photo-1600868157774-42b781e2898c?auto=format&fit=crop&w=400&q=80',
      productName: '美心 流心奶黄月饼礼盒', productPrice: '199', productDesc: '包装升级，送礼有面子',
      actionText: '右滑 提前定好伴手礼', doneText: '礼盒已预订，节前送达', icon: Gift
    },
    {
      id: 'f4', tagIcon: Utensils, tagText: '家庭聚餐', tagLabel: '食材异常增多', title: '周末请客？缺的配菜已找齐', color: 'emerald',
      aiReason: '您周五买了 5斤肉 和 2箱酒水（平时只买1斤）。推测有 6人 聚餐，为您补充以下配菜。',
      visualType: 'image', image: 'image_7010ac.jpg', // 替换为真实的聚餐配菜包图片
      productName: '6人份 聚餐生鲜配菜包', productPrice: '68', productDesc: '含青菜、菌菇、火锅底料等',
      actionText: '右滑 一键打包缺少的食材', doneText: '食材明早送达', icon: ShoppingCart
    },
    {
      id: 'f5', tagIcon: BookOpen, tagText: '学习辅导', tagLabel: '试卷分析', title: '孩子数学应用题较薄弱', color: 'emerald',
      aiReason: '您上传的试卷(68分)已分析完毕：计算题全对，应用题失分严重。推荐此专项练习。',
      visualType: 'image', image: 'https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?auto=format&fit=crop&w=400&q=80',
      productName: '小学数学 应用题专项突击', productPrice: '29', productDesc: '名师解析版',
      actionText: '右滑 购买专项练习册', doneText: '练习册已下单', icon: BookOpen
    }
  ],
  assistant: [
    {
      id: 'a1', tagIcon: Moon, tagText: '健康关怀', tagLabel: '睡眠负债', title: '你最近 3 天睡眠不足 6 小时', color: 'amber',
      aiReason: '健康数据同步：近期深度睡眠缺失。身体已经疲劳，今晚不宜熬夜。',
      visualType: 'sleepChart', productName: '睡眠模式预设定', productPrice: '无', productDesc: '自动屏蔽非紧急通知，调暗屏幕',
      actionText: '右滑 开启今晚勿扰安眠', doneText: '勿扰模式已定于 22:30 开启', icon: Moon
    },
    {
      id: 'a2', tagIcon: MapIcon, tagText: '通勤优化', tagLabel: '实时路况', title: '常规路线拥堵，已规划新路线', color: 'amber',
      aiReason: '您平时走的【高架路】拥堵。为您计算了辅路方案，预计能省 15 分钟。',
      visualType: 'map', mapLeft: '高架路(拥堵)', mapRight: '辅路(畅通)',
      productName: '智能导航接管', productPrice: '省15分', productDesc: '已发送至车机大屏',
      actionText: '右滑 切换至备选路线', doneText: '路线已更新至导航', icon: MapIcon
    },
    {
      id: 'a3', tagIcon: FileText, tagText: '会议日程', tagLabel: '1小时后', title: '下午有重要会议，资料已就绪', color: 'amber',
      aiReason: '日历提示下午 2:00【季度复盘会】。已从历史文档中为您提取了核心数据摘要。',
      visualType: 'doc', docName: '季度复盘会_摘要.pdf', docDesc: 'AI 已提取 3 个关键议题',
      actionText: '右滑 发送至我的电脑', doneText: '文件已隔空投送', icon: FileText
    },
    {
      id: 'a4', tagIcon: Users, tagText: '社交维系', tagLabel: '失联预警', title: '好久没和张伟聚聚了', color: 'amber',
      aiReason: '通讯录及微信分析：超过 3 个月未互动。今天是周五，要不要约个饭？',
      visualType: 'image', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
      productName: '拟定聚餐邀约', productPrice: '发送', productDesc: '已为您草拟了一条轻松的问候语',
      actionText: '右滑 发送问候消息', doneText: '消息已发送', icon: Users
    },
    {
      id: 'a5', tagIcon: Timer, tagText: '生活习惯', tagLabel: '久坐提醒', title: '你已经坐了整整 2 小时了', color: 'amber',
      aiReason: '智能手表久坐监测：颈椎压力已达阈值。该起来走走了，喝杯水休息一下。',
      visualType: 'image', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=400&q=80',
      productName: '5分钟 肩颈拉伸指南', productPrice: '免费', productDesc: '跟着微视频活动一下筋骨',
      actionText: '右滑 开始5分钟拉伸', doneText: '拉伸视频已全屏播放', icon: Activity
    }
  ]
};

const TABS = [
  { id: 'fitness', icon: Dumbbell, label: '健康达人', color: 'text-rose-400', bg: 'bg-rose-500/20', user: '蜉蝣', greeting: '去球场杀一局吗' },
  { id: 'young', icon: Zap, label: '职场精致girl', color: 'text-violet-400', bg: 'bg-violet-500/20', user: '美然', greeting: '今天也要闪闪发光' },
  { id: 'mom', icon: Baby, label: '一胎宝妈', color: 'text-cyan-400', bg: 'bg-cyan-500/20', user: '天纾', greeting: '昨晚带娃辛苦了' },
  { id: 'family', icon: Home, label: '全职主妇', color: 'text-emerald-400', bg: 'bg-emerald-500/20', user: '雪梅', greeting: '感受生活的小确幸' },
  { id: 'assistant', icon: Bot, label: '出差党', color: 'text-amber-400', bg: 'bg-amber-500/20', user: '老板', greeting: '随时为您待命' }
];

// ==========================================
// 2. 核心组件 & 渲染引擎
// ==========================================
const getThemeColor = (color) => {
  const themes = {
    cyan: { light: 'text-cyan-400', border: 'border-cyan-500/30', bg: 'bg-cyan-500/20', from: 'from-cyan-600/50', to: 'to-blue-500' },
    emerald: { light: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/20', from: 'from-emerald-600/50', to: 'to-green-500' },
    violet: { light: 'text-violet-400', border: 'border-violet-500/30', bg: 'bg-violet-500/20', from: 'from-violet-600/50', to: 'to-fuchsia-500' },
    amber: { light: 'text-amber-400', border: 'border-amber-500/30', bg: 'bg-amber-500/20', from: 'from-amber-600/50', to: 'to-orange-500' },
    rose: { light: 'text-rose-400', border: 'border-rose-500/30', bg: 'bg-rose-500/20', from: 'from-rose-600/50', to: 'to-pink-500' }
  };
  return themes[color];
};

const App = () => {
  // 核心状态：当前视图
  const [systemView, setSystemView] = useState('app'); // 'desktop' | 'voice' | 'app'

  // App 内部状态
  const [activeTab, setActiveTab] = useState('fitness');
  const [swipeState, setSwipeState] = useState({});
  const [doneState, setDoneState] = useState({});

  // 语音动画状态
  const [voiceStep, setVoiceStep] = useState(0);

  useEffect(() => {
    if (systemView === 'voice') {
      const timer1 = setTimeout(() => setVoiceStep(1), 1000);
      const timer2 = setTimeout(() => setVoiceStep(2), 3500);
      return () => { clearTimeout(timer1); clearTimeout(timer2); };
    } else {
      setVoiceStep(0);
    }
  }, [systemView]);

  // 处理滑块拖动
  const handleSlider = (e, id) => {
    const val = parseInt(e.target.value);
    setSwipeState(prev => ({ ...prev, [id]: val }));
    // 超过 90% 视为完成
    if (val >= 90) {
      setSwipeState(prev => ({ ...prev, [id]: 100 }));
      setDoneState(prev => ({ ...prev, [id]: true }));
    }
  };

  // 处理松手回弹效果
  const handleSliderRelease = (id) => {
    if ((swipeState[id] || 0) < 90 && !doneState[id]) {
      setSwipeState(prev => ({ ...prev, [id]: 0 }));
    }
  };

  // --- 可视化图表渲染引擎 (复用) ---
  const renderVisual = (item) => {
    const theme = getThemeColor(item.color);
    if (item.visualType === 'progress') {
      return (
        <div className="mx-5 mb-4 p-3 bg-white/5 rounded-2xl border border-white/5">
          <div className="flex justify-between text-xs text-gray-400 mb-2"><span>{item.progressName}</span><span className={theme.light}>已消耗 {item.progressPercent}%</span></div>
          <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden flex"><div className={`h-full ${theme.bg.replace('/20','')} w-[${item.progressPercent}%] rounded-full shadow-[0_0_10px_currentColor]`} style={{color: theme.light.replace('text-','')}}></div></div>
        </div>
      );
    }
    if (item.visualType === 'timeline') {
      return (
        <div className={`mx-5 mb-4 p-3 ${theme.bg} rounded-2xl border ${theme.border} flex flex-col`}>
          <div className={`flex items-center justify-between text-xs ${theme.light} opacity-80 mb-2`}><span className="flex items-center"><CalendarClock size={12} className="mr-1"/> {item.timelineLeft}</span><span className={`flex-1 mx-3 border-t ${theme.border} border-dashed`}></span><span className="flex items-center font-bold">{item.timelineRight}</span></div>
        </div>
      );
    }
    if (item.visualType === 'math') {
      const MathIcon = item.mathMiddleIcon || Coffee;
      return (
        <div className={`mx-5 mb-4 p-3 bg-gradient-to-r ${theme.from} to-transparent rounded-2xl border ${theme.border}`}>
          <div className="flex justify-between items-center mb-2 border-b border-white/5 pb-2"><span className="text-gray-400 text-xs">{item.mathTopLabel}</span><span className="text-white font-bold">{item.mathTopValue}</span></div>
          <div className="flex justify-between items-center mb-2"><span className={`${theme.light} text-xs flex items-center`}><MathIcon size={12} className="mr-1"/> {item.mathMiddleLabel}</span><span className={`${theme.light} font-bold`}>{item.mathMiddleValue}</span></div>
          <div className="flex justify-between items-center bg-white/10 p-2 rounded-lg"><span className="text-white/60 text-xs font-bold">{item.mathBottomLabel}</span><span className="text-white font-bold text-sm">{item.mathBottomValue}</span></div>
          <div className="mt-2 pt-2 border-t border-white/5 flex justify-between items-end"><span className="text-gray-400 text-[10px]">{item.mathFooterText}</span><div className="text-right">{item.mathOriginalPrice && <span className="text-gray-500 text-xs line-through mr-2">{item.mathOriginalPrice}</span>}<span className={`text-white font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r ${theme.from} to-white`}>{item.mathFinalPrice}</span></div></div>
        </div>
      );
    }
    if (item.visualType === 'sleepChart') {
      return (
        <div className="mx-5 mb-4 p-3 bg-white/5 rounded-2xl border border-white/5 flex items-end space-x-2 h-20">
          <div className="flex-1 bg-amber-500/80 rounded-t-md" style={{height: '80%'}}></div><div className="flex-1 bg-amber-500/80 rounded-t-md" style={{height: '75%'}}></div><div className="flex-1 bg-red-500/80 rounded-t-md" style={{height: '50%'}}></div><div className="flex-1 bg-red-500/80 rounded-t-md" style={{height: '45%'}}></div><div className="flex-1 bg-red-500/80 rounded-t-md relative flex items-center justify-center text-white text-[10px]" style={{height: '30%'}}>缺</div>
        </div>
      );
    }
    if (item.visualType === 'map') {
      return (
        <div className="mx-5 mb-4 relative rounded-2xl overflow-hidden h-[120px] bg-gray-900 border border-white/10 flex items-center justify-center flex-col">
           <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=400&q=80')] bg-cover"></div>
           <div className="relative z-10 bg-black/60 backdrop-blur px-3 py-1.5 rounded-full border border-rose-500/50 flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div><span className="text-white text-xs mr-2 line-through text-gray-400">{item.mapLeft}</span><ArrowRight size={12} className={`${theme.light} mr-2`}/><span className={`${theme.light} text-xs font-bold`}>{item.mapRight}</span>
           </div>
        </div>
      );
    }
    if (item.visualType === 'doc') {
      return (
        <div className="mx-5 mb-4 p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center">
           <div className={`w-10 h-10 ${theme.bg} rounded flex items-center justify-center mr-3`}><FileText className={theme.light.replace('text-', '')} size={20}/></div>
           <div><p className="text-white text-sm font-bold">{item.docName}</p><p className="text-gray-400 text-xs">{item.docDesc}</p></div>
        </div>
      );
    }
    return null;
  };

  // --- 视图 1：OS 桌面小组件 (渲染函数) ---
  const renderDesktopView = () => (
    <div className="flex-1 w-full relative pt-16 px-6 animate-fade-in">
      {/* 2x2 小号 Widget */}
      <div className="flex space-x-4 mb-6">
        <div onClick={() => { setActiveTab('young'); setSystemView('app'); }} className="w-[150px] h-[150px] bg-white/10 backdrop-blur-2xl rounded-[32px] border border-white/20 p-4 flex flex-col justify-between shadow-2xl relative overflow-hidden group cursor-pointer hover:scale-105 transition-transform">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-violet-500/30 rounded-full blur-2xl"></div>
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg"><Activity size={20} className="text-white" /></div>
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse mt-1 mr-1"></span>
          </div>
          <div>
            <p className="text-white/60 text-xs font-medium mb-1">1 个紧急待办</p>
            <h3 className="text-white font-bold text-sm leading-tight">北京出差遇雨<br/>需备防水外套</h3>
          </div>
        </div>

        {/* 占位 App 图标 */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center"><div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg"><MessageCircle className="text-white" size={28}/></div></div>
          <div className="flex flex-col items-center justify-center"><div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg"><Mail className="text-white" size={28}/></div></div>
          <div className="flex flex-col items-center justify-center"><div className="w-14 h-14 bg-gray-200 rounded-2xl flex items-center justify-center shadow-lg"><Camera className="text-gray-800" size={28}/></div></div>
          <div className="flex flex-col items-center justify-center"><div className="w-14 h-14 bg-red-500 rounded-2xl flex items-center justify-center shadow-lg"><Calendar className="text-white" size={28}/></div></div>
        </div>
      </div>

      {/* 4x4 大号 Widget */}
      <div onClick={() => { setActiveTab('young'); setSystemView('app'); }} className="w-full h-[320px] bg-[#1A1D24]/80 backdrop-blur-3xl rounded-[36px] border border-white/10 p-5 shadow-2xl relative overflow-hidden flex flex-col cursor-pointer hover:scale-[1.02] transition-transform">
        <div className="flex items-center justify-between mb-5 border-b border-white/10 pb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center"><Activity size={16} className="text-white" /></div>
            <span className="text-white font-bold text-base">贾维斯 <span className="text-white/50 font-normal text-sm ml-1">3个待办</span></span>
          </div>
          <div className="bg-violet-500/20 text-violet-300 text-xs px-2.5 py-1 rounded-full font-medium">查看全部</div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between bg-white/5 p-3 rounded-2xl border border-white/5">
             <div className="flex items-center space-x-3">
               <div className="bg-blue-500/20 p-2 rounded-xl text-blue-400"><CloudRain size={18} /></div>
               <div><p className="text-white font-bold text-sm">出差装备准备</p><p className="text-gray-400 text-xs mt-0.5">北京 15-25℃ 有雨</p></div>
             </div>
             <span className="bg-red-500/20 text-red-400 text-[10px] font-bold px-2 py-1 rounded border border-red-500/20">紧急</span>
          </div>

          <div className="flex items-center justify-between bg-white/5 p-3 rounded-2xl border border-white/5">
             <div className="flex items-center space-x-3">
               <div className="bg-pink-500/20 p-2 rounded-xl text-pink-400"><Gift size={18} /></div>
               <div><p className="text-white font-bold text-sm">闺蜜 Lisa 生日礼物</p><p className="text-gray-400 text-xs mt-0.5">YSL口红 直播间特惠</p></div>
             </div>
             <span className="text-gray-400 text-[10px]">还有 3 天</span>
          </div>

          <div className="flex items-center justify-between bg-white/5 p-3 rounded-2xl border border-white/5">
             <div className="flex items-center space-x-3">
               <div className="bg-cyan-500/20 p-2 rounded-xl text-cyan-400"><Package size={18} /></div>
               <div><p className="text-white font-bold text-sm">宝宝纸尿裤补货</p><p className="text-cyan-400 text-xs mt-0.5">剩余约2天用量</p></div>
             </div>
             <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center"><ChevronRight size={16} className="text-gray-400"/></div>
          </div>
        </div>
      </div>

      {/* 底部 Dock 栏 */}
      <div className="absolute bottom-6 left-4 right-4 h-20 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[32px] flex items-center justify-around px-4 shadow-2xl">
        <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg"><Phone className="text-white" size={24}/></div>
        <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg"><MapIcon className="text-white" size={24}/></div>
        <div className="w-12 h-12 bg-gray-200 rounded-2xl flex items-center justify-center shadow-lg"><MessageCircle className="text-gray-800" size={24}/></div>
        {/* 贾维斯 App 入口 */}
        <div onClick={() => { setActiveTab('fitness'); setSystemView('app'); }} className="w-12 h-12 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.5)] cursor-pointer hover:scale-105 transition-transform">
          <ShoppingBag className="text-white" size={24}/>
        </div>
      </div>
    </div>
  );

  // --- 视图 2：全局语音悬浮 (渲染函数) ---
  const renderVoiceOverlayView = () => (
    <div className="absolute inset-0 z-50 flex flex-col justify-end overflow-hidden animate-fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xl"></div>
      <div className="relative z-10 w-full px-5 pb-24 flex flex-col items-center">

        <div className="min-h-[80px] flex items-end justify-center mb-10 w-full text-center">
          {voiceStep === 0 && <p className="text-white/60 text-lg font-medium animate-pulse">正在倾听...</p>}
          {voiceStep >= 1 && (
            <p className="text-white text-xl font-bold leading-relaxed tracking-wide drop-shadow-lg max-w-[90%]">
               "检测到你明天去北京出差，那边预报有雨。
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400"> 我为你找了一款防水风衣，</span> 要去看看吗？"
            </p>
          )}
        </div>

        <div className={`w-full bg-[#1A1D24]/90 backdrop-blur-2xl rounded-[32px] border border-white/10 p-4 shadow-2xl mb-10 transform transition-all duration-700 ${voiceStep >= 2 ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95 pointer-events-none'}`}>
           <div className="flex space-x-3">
              <div className="w-[100px] h-[100px] rounded-2xl overflow-hidden flex-shrink-0 relative">
                 <img
                   src="https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=400&q=80"
                   className="w-full h-full object-cover"
                   alt="商品"
                   onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80'; }}
                 />
                 <div className="absolute bottom-1 right-1 bg-red-500 text-white text-[8px] px-1.5 py-0.5 rounded font-bold">直播中</div>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                 <h4 className="text-white font-bold text-sm mb-1">UR 通勤修身防水长风衣</h4>
                 <p className="text-gray-400 text-[10px] mb-2 leading-tight">防水防风，叠起来不占行李箱空间。目前直播间特惠。</p>
                 <div className="flex items-end justify-between">
                    <span className="text-white font-bold text-xl">¥399</span>
                    <button onClick={() => { setActiveTab('young'); setSystemView('app'); }} className="bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">直接购买</button>
                 </div>
              </div>
           </div>
        </div>

        <div className="relative w-32 h-32 flex items-center justify-center cursor-pointer hover:scale-95 transition-transform" onClick={() => setSystemView('desktop')}>
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full blur-2xl opacity-60 animate-[spin_4s_linear_infinite]"></div>
          <div className="absolute inset-2 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-full blur-xl opacity-70 animate-[spin_3s_linear_infinite_reverse]"></div>
          <div className="relative z-10 w-16 h-16 bg-white rounded-full shadow-[0_0_40px_rgba(255,255,255,0.8)] flex items-center justify-center">
             {voiceStep === 0 ? <Mic className="text-violet-600" size={24} /> : <Activity className="text-violet-600 animate-pulse" size={24} />}
          </div>
        </div>
      </div>
    </div>
  );

  // --- 视图 3：App 沉浸式内部视图 (渲染函数) ---
  const renderAppView = () => {
    const currentTabInfo = TABS.find(t => t.id === activeTab);
    return (
      <div className="absolute inset-0 z-50 bg-[#0F1115] flex flex-col animate-slide-up">
        {/* App 内部顶部栏 */}
        <div className="pt-14 pb-4 px-5 relative z-10 bg-[#0F1115] shadow-sm">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center border border-white/10 relative">
              <Activity size={22} className={getThemeColor(SCENARIOS[activeTab][0].color).light} />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0F1115]"></div>
            </div>
            <div>
              <h1 className="text-white font-bold text-xl leading-tight">{currentTabInfo?.greeting}，{currentTabInfo?.user}</h1>
              <p className="text-gray-400 text-xs flex items-center mt-0.5">
                 <ScanLine size={12} className="mr-1 opacity-70" /> 贾维斯已分析你的生活动态
              </p>
            </div>
          </div>
        </div>

        {/* 决策流 */}
        <div className="flex-1 overflow-y-auto px-4 pb-20 space-y-6 relative z-10 scrollbar-hide pt-2">
          {SCENARIOS[activeTab].map((item) => {
            const theme = getThemeColor(item.color);
            const TagIcon = item.tagIcon;
            const ActionIcon = item.icon;
            const swipeVal = swipeState[item.id] || 0;
            const isDone = doneState[item.id] || false;

            return (
              <div key={item.id} className="bg-[#1A1D24] rounded-[32px] border border-white/5 overflow-hidden shadow-2xl">
                <div className="px-5 pt-5 pb-3">
                  <div className="flex items-center space-x-2 mb-1.5">
                    <span className={`${theme.bg} ${theme.light} text-[10px] px-2 py-0.5 rounded flex items-center uppercase font-bold tracking-wider`}><TagIcon size={10} className="mr-1" /> {item.tagText}</span>
                    <span className="text-gray-400 text-[10px]">{item.tagLabel}</span>
                  </div>
                  <h2 className="text-white font-bold text-lg leading-snug">{item.title}</h2>
                </div>

                <div className={`mx-5 mb-4 p-3 ${theme.bg} rounded-2xl border ${theme.border} flex items-start space-x-3`}>
                  <Sparkles size={16} className={`${theme.light} flex-shrink-0 mt-0.5`} />
                  <p className="text-gray-300 text-xs leading-relaxed">{item.aiReason}</p>
                </div>

                {renderVisual(item)}

                {item.image && (
                  <div className="mx-5 mb-5 relative rounded-2xl overflow-hidden h-[120px] bg-white flex">
                    <div className="flex-1 p-3 flex flex-col justify-center bg-gradient-to-r from-[#1A1D24] to-gray-900 border-r border-white/5 relative z-10">
                      <h3 className="text-white text-sm font-bold mb-1">{item.productName}</h3>
                      <p className="text-gray-400 text-[10px] mb-2">{item.productDesc}</p>
                      <span className="text-white font-bold text-lg">{item.productPrice === '无' || item.productPrice === '发送' || item.productPrice === '投屏' ? item.productPrice : `¥${item.productPrice}`}</span>
                    </div>
                    <div className="w-[110px] h-full flex-shrink-0 relative">
                      <img
                        src={item.image}
                        className="w-full h-full object-cover opacity-80"
                        alt="商品"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80'; }}
                      />
                      {item.pip && (
                        <div className="absolute top-1 right-1 w-12 h-16 rounded shadow-lg border border-white/20 overflow-hidden">
                          <img
                            src={item.pip}
                            className="w-full h-full object-cover"
                            alt="PIP直播"
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=200&q=80'; }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="px-5 pb-5">
                  {!isDone ? (
                    <div className="relative h-14 bg-white/5 rounded-full border border-white/10 overflow-hidden flex items-center px-1">
                      {/* 背景填充：增加 ease-out 的平滑过渡，便于回弹 */}
                      <div className={`absolute left-0 top-0 h-full bg-gradient-to-r ${theme.from} ${theme.to} transition-all duration-200 ease-out`} style={{ width: `${swipeVal}%` }}></div>
                      <div className="absolute w-full text-center pointer-events-none flex items-center justify-center">
                        <span className="text-white/40 text-xs font-medium tracking-wide">{swipeVal > 10 ? '释放以授权...' : item.actionText}</span>
                        <ChevronRight size={14} className={`text-white/30 ml-1 transition-opacity ${swipeVal > 10 ? 'opacity-0' : 'opacity-100'}`} />
                      </div>
                      {/* 滑块核心：同样加平滑过渡 */}
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg relative z-10 transition-transform duration-200 ease-out" style={{ transform: `translateX(${(swipeVal / 100) * 254}px)` }}>
                        <ActionIcon size={20} className={theme.light.replace('text-', 'text-')} style={{color: 'black'}} />
                      </div>

                      <input
                        type="range"
                        min="0" max="100"
                        value={swipeVal}
                        onChange={(e) => handleSlider(e, item.id)}
                        onMouseUp={() => handleSliderRelease(item.id)}
                        onTouchEnd={() => handleSliderRelease(item.id)}
                        className="auth-slider"
                      />
                    </div>
                  ) : (
                    <div className={`h-14 ${theme.bg} rounded-full border ${theme.border} flex items-center justify-center ${theme.light} space-x-2 animate-fade-in`}>
                      <CheckCircle2 size={18} /><span className="font-bold text-xs">{item.doneText}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 底部 Home Bar (点击返回桌面) */}
        <div className="absolute bottom-0 inset-x-0 h-8 flex justify-center items-center cursor-pointer bg-gradient-to-t from-black/80 to-transparent z-50 hover:bg-white/5" onClick={() => setSystemView('desktop')}>
           <div className="w-32 h-1.5 bg-white/50 rounded-full"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] font-sans text-gray-800 selection:bg-violet-500/30">
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .auth-slider { -webkit-appearance: none; width: 100%; height: 100%; background: transparent; position: absolute; left: 0; top: 0; z-index: 20; outline: none; }
        .auth-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 52px; height: 52px; border-radius: 50%; background: transparent; cursor: pointer; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        @keyframes slide-up { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />

      {/* ==========================================
          全局控制台 (仅供原型演示，置于手机外)
      ========================================== */}
      <div className="w-full bg-[#111318] border-b border-white/5 pt-4 pb-3 px-6 flex flex-col items-center justify-center sticky top-0 z-50 shadow-2xl">

        {/* 第一行：系统级交互切换 */}
        <div className="bg-black/50 p-1 rounded-2xl flex space-x-1 border border-white/5 mb-3">
          <button onClick={() => setSystemView('desktop')} className={`px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center ${systemView === 'desktop' ? 'bg-white/10 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}>
             <Home size={16} className="mr-2"/> 手机桌面 (OS)
          </button>
          <button onClick={() => setSystemView('voice')} className={`px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center ${systemView === 'voice' ? 'bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 text-violet-300 border border-violet-500/30' : 'text-gray-500 hover:text-white'}`}>
            <Mic size={16} className="mr-2" /> 语音唤醒 (Siri)
          </button>
          <button onClick={() => setSystemView('app')} className={`px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center ${systemView === 'app' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'text-gray-500 hover:text-white'}`}>
             <ShoppingBag size={16} className="mr-2"/> 贾维斯 App
          </button>
        </div>

        {/* 第二行：人群切换 (仅在 App 视图展示) */}
        <div className={`flex space-x-3 overflow-x-auto scrollbar-hide transition-all duration-300 ${systemView === 'app' ? 'h-10 opacity-100' : 'h-0 opacity-0 overflow-hidden pointer-events-none'}`}>
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 flex items-center space-x-2 px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${isActive ? `${tab.bg} ${tab.color} border border-${tab.color.split('-')[1]}-500/30` : 'bg-white/5 text-gray-400 border border-transparent hover:bg-white/10'}`}
              >
                <Icon size={14} /> <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ==========================================
          沉浸式手机壳容器
      ========================================== */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-[390px] h-[844px] bg-[#000] rounded-[3rem] shadow-[0_0_80px_rgba(139,92,246,0.15)] overflow-hidden border-[8px] border-[#22252F] relative flex flex-col bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center">

          {/* 手机刘海 & 状态栏 (全局固定) */}
          <div className="absolute top-0 inset-x-0 h-12 z-[60] flex justify-between items-start px-6 pt-3 pointer-events-none">
             <span className="text-white font-bold text-sm drop-shadow-md">09:41</span>
             <div className="w-32 h-6 bg-[#22252F] rounded-b-2xl absolute left-1/2 -translate-x-1/2 top-0 pointer-events-auto"></div>
             <div className="flex items-center space-x-1.5 text-white drop-shadow-md">
                <Wifi size={14} /> <BatteryMedium size={16} />
             </div>
          </div>

          {/* 渲染当前层级视图 */}
          {systemView === 'desktop' && renderDesktopView()}
          {systemView === 'voice' && renderVoiceOverlayView()}
          {systemView === 'app' && renderAppView()}

        </div>
      </div>
    </div>
  );
};

export default App;
