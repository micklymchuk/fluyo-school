# Mock Launch Content Pack

**Project:** fluyo-school  
**Created:** 2026-06-26  
**Method:** WDS Phase 6 Asset Generation - Content  
**Status:** Mock / implementation preview only  

---

## Usage Rules

This file unblocks implementation while final launch content is still missing.

**Allowed for:**
- Local implementation
- Internal preview
- Layout testing
- Copy length testing in Ukrainian and English
- Placeholder image and proof slots

**Not allowed for public launch:**
- Presenting mock teachers as real teachers
- Presenting mock testimonials as real reviews
- Presenting mock results as achieved outcomes
- Presenting mock prices or trial duration as final approved terms

**Implementation rule:** Keep mock content behind a clear content source flag such as `contentSource: "mock"`. Before public release, replace this file with approved production content or hide sections that still depend on mock proof.

---

## Strategic Traceability

```yaml
content_purpose:
  content_type: "Mock launch content pack"
  purpose_statement: "Unblock implementation preview with realistic bilingual content while preserving clear replacement requirements before launch."
  audience:
    who: "Internal implementation team and founder reviewing the landing page preview"
    state: "Needs realistic content density and proof slots before final assets are ready"
    context: "After Phase 4 UX specs and before build implementation"
  success_criteria:
    - "Landing page can be built and reviewed with realistic content lengths"
    - "Mock proof is visibly traceable in source files"
    - "Final content replacement remains explicit before public launch"
  model_priorities:
    primary: ["Action Mapping", "Customer Awareness"]
    secondary: ["Trigger Map", "Golden Circle"]
    tertiary: ["Badass Users"]
```

```yaml
trigger_map_reference:
  business_goal: "Create confident paid trial starters"
  supporting_goals:
    - "Build trust before price"
    - "Make each launch audience feel immediately recognized"
  personas:
    - "Danylo: exam student needing structure and credibility"
    - "Olena: parent needing teacher trust and lesson visibility"
    - "Marta: adult learner needing safe speaking practice"
  required_action: "Visitor opens Telegram with enough context to ask about a paid trial lesson"
```

---

## Mock Commercial Terms

Use these values for implementation preview only.

| Item | UA | EN | Mock Value |
| --- | --- | --- | --- |
| Paid trial lesson | Пробний урок | Trial lesson | 30 minutes, 300 UAH |
| Individual lesson | Індивідуальний урок | Individual lesson | 60 minutes, from 700 UAH |
| Pair lesson | Урок у парі | Pair lesson | 60 minutes, from 500 UAH / student |
| Mini-group lesson | Міні-група | Mini-group lesson | 60 minutes, from 350 UAH / student |
| Mini-group size | До 4 студентів | Up to 4 students | Confirmed cap |

### Pricing Notes

**UA:** Ціни вказані для прев'ю макета. Перед запуском їх потрібно замінити на затверджені умови Fluyo.  
**EN:** Prices are shown for layout preview. Before launch, replace them with approved Fluyo terms.

---

## Mock Teacher Profiles

Use 3-4 profiles in the teacher section. These are fictional placeholders.

### Teacher 01

```yaml
id: "mock_teacher_anna"
mock_status: "fictional_placeholder"
photo_placeholder: "adult teacher portrait, warm minimal home-office background, burgundy accent"
ua:
  name: "Анна К."
  role: "Викладачка для дорослих і speaking practice"
  bio: "Допомагає дорослим говорити сміливіше: через реальні ситуації, м'яку корекцію і фрази, які можна використати одразу."
  credentials:
    - "Досвід індивідуальних і парних занять"
    - "Фокус на розмовній практиці A2-B2"
    - "Методичні матеріали для роботи, подорожей і щоденних діалогів"
en:
  name: "Anna K."
  role: "Teacher for adults and speaking practice"
  bio: "Helps adults speak with more confidence through real situations, gentle correction, and phrases they can use right away."
  credentials:
    - "Experience with individual and pair lessons"
    - "Speaking practice focus for A2-B2 learners"
    - "Materials for work, travel, and everyday dialogues"
```

### Teacher 02

```yaml
id: "mock_teacher_sofia"
mock_status: "fictional_placeholder"
photo_placeholder: "friendly online kids teacher portrait, light background, calm premium school tone"
ua:
  name: "Софія М."
  role: "Викладачка для дітей 6+"
  bio: "Проводить динамічні онлайн-уроки для дітей: інтерактивні завдання, багато підтримки і зрозумілий фідбек для батьків."
  credentials:
    - "Досвід занять з дітьми 6+"
    - "Інтерактивні матеріали і speaking games"
    - "Регулярний короткий фідбек для батьків"
en:
  name: "Sofia M."
  role: "Teacher for kids 6+"
  bio: "Runs active online lessons for children with interactive tasks, patient support, and clear feedback for parents."
  credentials:
    - "Experience teaching children 6+"
    - "Interactive materials and speaking games"
    - "Regular short feedback for parents"
```

### Teacher 03

```yaml
id: "mock_teacher_mariia"
mock_status: "fictional_placeholder"
photo_placeholder: "exam preparation teacher portrait, clean desk, notebook, certificate frame"
ua:
  name: "Марія Г."
  role: "Викладачка з підготовки до іспитів"
  bio: "Допомагає студентам структурувати підготовку до НМТ, ЄВІ, Cambridge, TOEFL і CELPIP через план, практику і регулярний фідбек."
  credentials:
    - "Підготовка до українських і міжнародних іспитів"
    - "Фокус на дедлайнах, слабких місцях і тренувальних завданнях"
    - "Пояснює прогрес простими кроками"
en:
  name: "Mariia H."
  role: "Exam preparation teacher"
  bio: "Helps students structure preparation for NMT, EVI, Cambridge, TOEFL, and CELPIP through planning, practice, and regular feedback."
  credentials:
    - "Preparation for Ukrainian and international exams"
    - "Focus on deadlines, weak spots, and practice tasks"
    - "Explains progress in clear steps"
```

### Teacher 04

```yaml
id: "mock_teacher_olena"
mock_status: "fictional_placeholder"
photo_placeholder: "teacher for teens and business English, calm confident portrait, laptop and books"
ua:
  name: "Олена П."
  role: "Викладачка для підлітків і Business English"
  bio: "Працює з підлітками та дорослими, яким потрібна англійська для навчання, роботи, презентацій і впевненого спілкування."
  credentials:
    - "Підлітки, дорослі, робочі ситуації"
    - "Практика презентацій, листування і коротких розмов"
    - "Гнучкий темп і зрозумілі домашні завдання"
en:
  name: "Olena P."
  role: "Teacher for teens and Business English"
  bio: "Works with teens and adults who need English for study, work, presentations, and confident communication."
  credentials:
    - "Teens, adults, and work situations"
    - "Practice for presentations, messages, and short conversations"
    - "Flexible pace and clear homework"
```

---

## Mock Certificate Proof

```yaml
certificates:
  - id: "mock_certificate_language_teaching"
    ua_title: "Сертифікат з методики викладання англійської"
    en_title: "English teaching methodology certificate"
    visual_placeholder: "certificate thumbnail with private data blurred"
  - id: "mock_certificate_exam_prep"
    ua_title: "Сертифікат / тренінг з exam preparation"
    en_title: "Exam preparation certificate / training"
    visual_placeholder: "certificate thumbnail with issuing details replaced before launch"
  - id: "mock_certificate_child_teaching"
    ua_title: "Навчання з роботи з дітьми онлайн"
    en_title: "Training for online lessons with children"
    visual_placeholder: "certificate thumbnail, privacy-safe crop"
```

---

## Mock Lesson Screenshot Slots

Use these as design directions for placeholders or generated preview images. Do not present them as real lesson screenshots.

### Slot 01 - Kids Interactive Lesson

**UA title:** Інтерактивне завдання для дітей  
**EN title:** Interactive task for kids  
**UA caption:** Дитина бачить завдання, відповідає голосом і отримує підтримку викладача під час уроку.  
**EN caption:** The child sees the task, answers aloud, and receives teacher support during the lesson.  
**Visual direction:** Clean online lesson interface, child-safe abstract task, no real child face, burgundy accents, white background.

### Slot 02 - Adult Speaking Practice

**UA title:** Speaking practice для дорослих  
**EN title:** Speaking practice for adults  
**UA caption:** Урок тренує короткі відповіді, питання і фрази для роботи, подорожей або щоденних розмов.  
**EN caption:** The lesson practices short replies, questions, and phrases for work, travel, or everyday conversations.  
**Visual direction:** Video lesson mockup with phrase cards, adult learner notes, no personal data, premium minimal style.

### Slot 03 - Exam Prep Task

**UA title:** Практика під формат іспиту  
**EN title:** Practice for exam format  
**UA caption:** Студент бачить тип завдання, типові помилки і наступний крок у підготовці.  
**EN caption:** The student sees the task type, common mistakes, and the next preparation step.  
**Visual direction:** Digital worksheet preview, exam-style task blocks, progress note, no official exam branding.

### Slot 04 - Feedback Preview

**UA title:** Короткий фідбек після уроку  
**EN title:** Short feedback after the lesson  
**UA caption:** Після заняття учень або батьки бачать, що вже виходить і що тренувати далі.  
**EN caption:** After the lesson, the learner or parent sees what already works and what to practice next.  
**Visual direction:** Privacy-safe feedback card, three bullets, next-focus tag, Fluyo burgundy accent.

---

## Mock Testimonials

All testimonials below are fictional preview copy.

### Testimonial 01 - Parent

```yaml
id: "mock_testimonial_parent_01"
category: "parents"
mock_status: "fictional_placeholder"
ua:
  quote: "Мені сподобалося, що після уроку було зрозуміло, що дитина робила і над чим працювати далі. Онлайн-формат не виглядав пасивним."
  author: "Мама учня 8 років"
  context_badge: "Дитячі уроки"
en:
  quote: "I liked that after the lesson I could understand what my child did and what to work on next. The online format did not feel passive."
  author: "Parent of an 8-year-old learner"
  context_badge: "Kids lessons"
```

### Testimonial 02 - Exam Student

```yaml
id: "mock_testimonial_exam_01"
category: "students"
mock_status: "fictional_placeholder"
ua:
  quote: "Після пробного уроку я нарешті побачив план: які теми підтягнути, як тренувати завдання і скільки часу реально потрібно."
  author: "Студент, підготовка до НМТ"
  context_badge: "Іспити"
en:
  quote: "After the trial lesson I finally saw the plan: which topics to improve, how to practice tasks, and how much time I realistically needed."
  author: "Student preparing for NMT"
  context_badge: "Exam prep"
```

### Testimonial 03 - Adult Learner

```yaml
id: "mock_testimonial_adult_01"
category: "adults"
mock_status: "fictional_placeholder"
ua:
  quote: "Я боялася говорити з помилками, але уроки побудовані так, що ти говориш маленькими кроками і не зупиняєшся після кожної помилки."
  author: "Доросла студентка, speaking practice"
  context_badge: "Дорослі"
en:
  quote: "I was afraid to speak with mistakes, but the lessons are built so you speak in small steps and do not stop after every mistake."
  author: "Adult learner, speaking practice"
  context_badge: "Adults"
```

### Testimonial 04 - Pair / Mini-Group

```yaml
id: "mock_testimonial_group_01"
category: "students"
mock_status: "fictional_placeholder"
ua:
  quote: "У парі легше тренувати діалоги, але викладач все одно тримає фокус на моїх помилках і фразах, які мені потрібні."
  author: "Студентка, заняття у парі"
  context_badge: "Пари"
en:
  quote: "In a pair, it is easier to practice dialogues, but the teacher still keeps focus on my mistakes and the phrases I need."
  author: "Student, pair lessons"
  context_badge: "Pairs"
```

---

## Mock Results / Proof Cards

These are illustrative proof-card placeholders, not verified outcomes.

### Proof Card 01 - Speaking Confidence

**UA title:** Від пасивного знання до живих відповідей  
**EN title:** From passive knowledge to live replies  
**UA body:** Учень тренує короткі відповіді, уточнення і фрази, які потрібні саме в його ситуаціях.  
**EN body:** The learner practices short replies, clarifying questions, and phrases needed in their own situations.  
**Metric label:** Mock progress example  

### Proof Card 02 - Parent Visibility

**UA title:** Батьки бачать логіку уроку  
**EN title:** Parents see the lesson logic  
**UA body:** Після заняття можна показати фокус уроку, активність дитини і наступний крок.  
**EN body:** After the lesson, the school can show the lesson focus, the child's activity, and the next step.  
**Metric label:** Mock parent proof  

### Proof Card 03 - Exam Structure

**UA title:** Підготовка не розпадається на хаос  
**EN title:** Preparation does not turn into chaos  
**UA body:** Студент бачить ціль, слабкі місця, типи завдань і регулярну практику до дедлайну.  
**EN body:** The student sees the goal, weak spots, task types, and regular practice before the deadline.  
**Metric label:** Mock exam proof  

---

## Mock FAQ Answers

These answers are layout-ready but must be checked against final operations.

### Trial Lesson

**UA question:** Що входить у пробний урок?  
**UA answer:** На пробному уроці викладач уточнює вашу ціль, поточний рівень, слабкі місця і комфортний формат. Після цього менеджер допомагає підібрати наступний крок.  
**EN question:** What is included in the trial lesson?  
**EN answer:** During the trial lesson, the teacher clarifies your goal, current level, weak spots, and comfortable format. After that, the manager helps match the next step.

### Trial Price

**UA question:** Скільки коштує пробний урок?  
**UA answer:** Для прев'ю макета використовується mock-ціна 300 UAH за 30 хвилин. Перед запуском потрібно замінити це на фінальні умови Fluyo.  
**EN question:** How much does the trial lesson cost?  
**EN answer:** For layout preview, the mock price is 300 UAH for 30 minutes. Before launch, replace this with final Fluyo terms.

### Format Choice

**UA question:** Як зрозуміти, який формат мені підходить?  
**UA answer:** Якщо не впевнені, напишіть у Telegram свою ціль, рівень і зручний графік. Fluyo допоможе обрати між індивідуальними заняттями, парою або міні-групою до 4 людей.  
**EN question:** How do I know which format fits me?  
**EN answer:** If you are unsure, message us on Telegram with your goal, level, and preferred schedule. Fluyo will help choose between individual lessons, pair lessons, or a mini-group of up to 4 people.

### Kids Lessons

**UA question:** Чи підходить онлайн-формат для дітей?  
**UA answer:** У прев'ю Fluyo показує формат з інтерактивними завданнями, speaking games і коротким фідбеком для батьків. Реальні скріншоти потрібно замінити перед запуском.  
**EN question:** Does the online format work for children?  
**EN answer:** In preview, Fluyo shows a format with interactive tasks, speaking games, and short feedback for parents. Real screenshots must replace mock visuals before launch.

### Adult Speaking

**UA question:** Я дорослий і боюся говорити з помилками. Це нормально?  
**UA answer:** Так. Дорослий шлях Fluyo побудований навколо безпечної практики: короткі відповіді, реальні ситуації і корекція, яка не зупиняє розмову.  
**EN question:** I am an adult and I am afraid to speak with mistakes. Is that normal?  
**EN answer:** Yes. The adult path at Fluyo is built around safe practice: short replies, real situations, and correction that does not stop the conversation.

### Exam Preparation

**UA question:** До яких іспитів можна готуватися?  
**UA answer:** У mock-контенті Fluyo показує напрямки НМТ, ЄВІ, Cambridge, TOEFL і CELPIP. Перед запуском потрібно підтвердити актуальний перелік програм і викладачів.  
**EN question:** Which exams can I prepare for?  
**EN answer:** In mock content, Fluyo shows NMT, EVI, Cambridge, TOEFL, and CELPIP paths. Before launch, confirm the active program list and teachers.

---

## Mock Telegram Message Intents

Use direct chat URL by default: `https://t.me/fluyo_manager`.

Prepared messages are optional. If implemented, test app/browser fallback.

### General Trial

**EN:** Hi! I want to book a paid trial lesson at Fluyo School.  
**UA:** Вітаю! Хочу записатися на платний пробний урок у Fluyo School.

### Exam Prep

**EN:** Hi! I want to book a trial lesson for exam preparation. My exam is: [exam]. My deadline is: [date].  
**UA:** Вітаю! Хочу записатися на пробний урок для підготовки до іспиту. Мій іспит: [іспит]. Дедлайн: [дата].

### Kids / Parents

**EN:** Hi! I want to ask about English lessons for my child. Age: [age]. Current level: [level]. Preferred schedule: [schedule].  
**UA:** Вітаю! Хочу дізнатися про уроки англійської для дитини. Вік: [вік]. Поточний рівень: [рівень]. Зручний графік: [графік].

### Adults

**EN:** Hi! I want to improve my speaking English. Goal: [work/travel/study/everyday]. Current level: [level]. Preferred format: [individual/pair/group].  
**UA:** Вітаю! Хочу покращити розмовну англійську. Ціль: [робота/подорожі/навчання/щоденні розмови]. Рівень: [рівень]. Формат: [індивідуально/пара/група].

---

## Implementation Mapping

| UX Area | Mock Content Source |
| --- | --- |
| Pricing section | `Mock Commercial Terms` |
| Teachers section | `Mock Teacher Profiles` + `Mock Certificate Proof` |
| Lesson Experience section | `Mock Lesson Screenshot Slots` |
| Results / Testimonials / FAQ section | `Mock Testimonials`, `Mock Results / Proof Cards`, `Mock FAQ Answers` |
| Why Fluyo proof snapshots | `Mock Teacher Profiles`, `Mock Lesson Screenshot Slots`, `Mock Results / Proof Cards` |
| Telegram CTAs | `Mock Telegram Message Intents` |

---

## Replacement Checklist Before Public Launch

- [ ] Replace mock trial price and duration with approved commercial terms.
- [ ] Replace recurring lesson prices and package structure with approved terms.
- [ ] Replace fictional teacher profiles with real teacher names, portraits, credentials, and short bios.
- [ ] Replace certificate placeholders with approved public certificate crops.
- [ ] Replace mock lesson screenshots with approved privacy-safe screenshots or generated non-proof visuals.
- [ ] Replace fictional testimonials with approved reviews or hide testimonial cards.
- [ ] Replace illustrative proof cards with approved results or neutral non-claim copy.
- [ ] Confirm payment, scheduling, cancellation, and rescheduling FAQ answers.
- [ ] Confirm prepared Telegram message behavior and app/browser fallback.
- [ ] Confirm whether Instagram appears only in header/final CTA or also in proof sections.

---

_Mock content generated to unblock implementation preview. Replace before public launch._
