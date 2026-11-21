/* ==========================================================================
   Lessons content
   Skill images, sample curriculum (replace with your real lessons), levels, course cards
   ========================================================================== */

const IMG = {
  listening: 'assets/images/skills/listening.png',
  speaking: 'assets/images/skills/speaking.png',
  reading: 'assets/images/skills/reading.png',
  writing: 'assets/images/skills/writing.png',
  arrow: 'assets/images/icons/arrow.png',
  intro: 'assets/images/roadmap/intro.png',
  studying: 'assets/images/roadmap/studying.png'
};

const mk = t =>
  t.map((x, i) => [
    x,
    5 + Math.round((i * 10) / Math.max(1, t.length - 1)),
    i < t.length * 0.4 ? 'A1' : i < t.length * 0.8 ? 'A2' : 'B1'
  ]); // minutes + level are generated
const SKILLS = [
  {
    id: 'listening',
    name: 'Nghe',
    en: 'Listening',
    lessons: mk([
      'Chào hỏi hằng ngày',
      'Giới thiệu bản thân',
      'Số đếm và số điện thoại',
      'Hỏi giờ giấc',
      'Hỏi đường đi',
      'Gọi món ở nhà hàng',
      'Mua sắm và trả giá',
      'Đặt phòng khách sạn',
      'Nghe thông báo ở sân bay',
      'Nghe một cuộc hội thoại dài'
    ])
  },
  {
    id: 'speaking',
    name: 'Nói',
    en: 'Speaking',
    lessons: mk([
      'Phát âm bảng chữ cái',
      'Nói lời chào và tạm biệt',
      'Giới thiệu gia đình',
      'Đặt câu hỏi đơn giản',
      'Nói về sở thích',
      'Hội thoại ở quán cà phê',
      'Hỏi và chỉ đường',
      'Gọi điện thoại',
      'Kể về một ngày của bạn',
      'Thuyết trình ngắn'
    ])
  },
  {
    id: 'reading',
    name: 'Đọc',
    en: 'Reading',
    lessons: mk([
      'Đọc biển báo và thông báo',
      'Đọc thực đơn',
      'Đọc lịch và thời gian biểu',
      'Đọc nhãn sản phẩm',
      'Email đơn giản',
      'Tin nhắn và thư mời',
      'Quảng cáo ngắn',
      'Tin tức ngắn',
      'Câu chuyện ngắn 1',
      'Câu chuyện ngắn 2',
      'Đọc hướng dẫn sử dụng',
      'Bài blog du lịch',
      'Thư xin việc',
      'Bài báo khoa học đơn giản',
      'Truyện song ngữ'
    ])
  },
  {
    id: 'writing',
    name: 'Viết',
    en: 'Writing',
    lessons: mk([
      'Viết câu hoàn chỉnh',
      'Điền thông tin cá nhân',
      'Viết tin nhắn',
      'Viết lời mời',
      'Viết email ngắn',
      'Mô tả bản thân',
      'Mô tả một bức ảnh',
      'Viết thư cảm ơn',
      'Viết đoạn văn ngắn',
      'Viết nhật ký'
    ])
  }
];
const GOAL = 20;
const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
  CARDS = ['Xây Dựng<br>Từ Vựng', 'Xây Dựng<br>Kỹ Năng', 'Xây Dựng<br>Ngữ Pháp', 'Ôn Tập<br>Kiểm Tra'];

/* Sample vocabulary roadmap topics for A1 & A2 (replace with your full topic list when ready) */
const mkTopic = (lv, t) => t.map((x, i) => [x, 5 + i * 2, lv]);
const ROADMAP_TOPICS = [
  {
    id: 'vocab-intro',
    name: 'Giới thiệu',
    level: 'A1',
    shape: 'circle',
    img: 'intro',
    lessons: mkTopic('A1', [
      'Lời chào và tạm biệt',
      'Tên, tuổi và quốc tịch',
      'Nghề nghiệp cơ bản',
      'Số đếm từ 1 đến 100'
    ])
  },
  {
    id: 'vocab-study',
    name: 'Học tập',
    level: 'A1',
    shape: 'circle',
    img: 'studying',
    lessons: mkTopic('A1', ['Đồ dùng học tập', 'Môn học ở trường', 'Hoạt động trong lớp', 'Thời khóa biểu'])
  },
  {
    id: 'vocab-family',
    name: 'Gia đình',
    level: 'A1',
    shape: 'square',
    lessons: mkTopic('A1', [
      'Thành viên gia đình',
      'Ngoại hình và tính cách',
      'Mối quan hệ họ hàng',
      'Thú cưng trong nhà'
    ])
  },
  {
    id: 'vocab-home',
    name: 'Chỗ ở',
    level: 'A1',
    shape: 'circle',
    lessons: mkTopic('A1', [
      'Các phòng trong nhà',
      'Đồ nội thất cơ bản',
      'Thiết bị gia dụng',
      'Việc nhà hằng ngày'
    ])
  },
  {
    id: 'vocab-food',
    name: 'Ẩm thực',
    level: 'A1',
    shape: 'square',
    lessons: mkTopic('A1', [
      'Trái cây và rau củ',
      'Thức ăn và đồ uống',
      'Bữa ăn trong ngày',
      'Gọi món ở nhà hàng'
    ])
  },
  {
    id: 'vocab-routine',
    name: 'Sinh hoạt',
    level: 'A2',
    shape: 'circle',
    lessons: mkTopic('A2', [
      'Thói quen buổi sáng',
      'Thời gian rảnh và sở thích',
      'Thể thao và vận động',
      'Kế hoạch cuối tuần'
    ])
  },
  {
    id: 'vocab-shopping',
    name: 'Mua sắm',
    level: 'A2',
    shape: 'square',
    lessons: mkTopic('A2', [
      'Quần áo và phụ kiện',
      'Màu sắc và kích cỡ',
      'Giá cả và thanh toán',
      'Tại siêu thị và cửa hàng'
    ])
  },
  {
    id: 'vocab-travel',
    name: 'Du lịch',
    level: 'A2',
    shape: 'circle',
    lessons: mkTopic('A2', [
      'Phương tiện giao thông',
      'Hỏi và chỉ đường',
      'Đặt phòng khách sạn',
      'Tại sân bay và nhà ga'
    ])
  },
  {
    id: 'vocab-work',
    name: 'Công việc',
    level: 'A2',
    shape: 'square',
    lessons: mkTopic('A2', [
      'Văn phòng và đồng nghiệp',
      'Giao tiếp qua email',
      'Cuộc họp và lịch hẹn',
      'Phỏng vấn xin việc'
    ])
  }
];
