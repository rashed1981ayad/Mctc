import React from "react";
import "../styles/reference.ar.css";

export default function AboutPage() {
  return (
<div id="main-content" className="about-main">
      <section className="about-hero" aria-labelledby="about-hero-title">
        <div className="about-hero-grid" aria-hidden="true"></div>
        <div className="about-hero-orbit about-orbit-one" aria-hidden="true"></div>
        <div className="about-hero-orbit about-orbit-two" aria-hidden="true"></div>

        <div className="about-hero-content">
          <span className="about-eyebrow">حول المتقدم</span>
          <h1 id="about-hero-title">نبتكر اليوم لنمكّن الغد</h1>
          <p>نؤمن أن المستقبل يبدأ بالحلول التي نصممها اليوم. لذلك نعمل على تطوير بنى تقنية ذكية وحلول رقمية متكاملة تساعد المؤسسات على العمل بكفاءة أعلى والاستعداد لتحديات الغد. من الشبكات والبنية التحتية إلى الأنظمة الذكية والخدمات السحابية، نركز على بناء بيئات تقنية موثوقة تدعم النمو والاستمرارية في عالم رقمي سريع التطور.</p>
        </div>

        <div className="about-hero-visual" aria-hidden="true">
          <div className="about-tech-core"><strong>نحو مستقبل<br />أذكى</strong></div>
          <span className="about-tech-chip chip-one"><i className="fa-solid fa-network-wired"></i> بنية موثوقة</span>
          <span className="about-tech-chip chip-two"><i className="fa-solid fa-cloud"></i> حلول رقمية</span>
          <span className="about-tech-chip chip-three"><i className="fa-solid fa-shield-halved"></i> تشغيل آمن</span>
        </div>
      </section>

      <section className="about-introduction" aria-labelledby="about-intro-title">
        <div className="about-introduction-inner">
          <figure className="about-logo-panel">
            <img src="/site-assets/mctc-about-logo-transparent.webp" alt="شعار شركة المتقدم MCTC" />
          </figure>
          <div className="about-introduction-copy">
            <span className="section-kicker">من نحن</span>
            <h2 id="about-intro-title">خبرات متكاملة بمعايير احترافية عالمية</h2>
            <p>منذ تأسيسها في 2013، تقدم شركتنا نهجًا عمليًا ومتمحورًا حول العميل لتمكين المؤسسات من تحويل تحدياتها التقنية إلى فرص نمو حقيقية. يقع مقرنا في بنغازي، ونفهم خصوصية السوق المحلي؛ لذلك نجمع بين خبرة تنفيذية محلية ومعايير احترافية عالمية في كل مشروع ننفذه.</p>
            <p>ما يميزنا هو القدرة على تحويل الاحتياجات التقنية إلى خطط تنفيذية قابلة للتطبيق بسرعة وجودة، مع التركيز على الأمان، وقابلية التوسع، والاقتصاد في التكلفة التشغيلية. نعمل كشريك تقني طويل الأمد لا كمورّد، ونلتزم بتحقيق نتائج تقود أعمالك قدمًا.</p>
          </div>
        </div>

      <div className="about-values about-values-embedded" aria-labelledby="about-values-title">
        <div className="about-values-intro">
          <div className="about-section-heading">
            <span className="section-kicker">ما يقودنا</span>
            <h2 id="about-values-title">القيم</h2>
          </div>
          <p>يعيش الإنسان على قيم تحدد طريقته في الحياة وتعامله مع نفسه ومع الآخرين، وتعتمد عليها كثير من اختياراته وأهدافه. لهذا ننظر إلى المتقدم ككيان حي يفكر ويتنفس ويؤثر ويتأثر من خلال قيمه.</p>
        </div>

        <div className="value-cards">
          <article className="value-card"><span className="value-icon"><i className="fa-solid fa-eye"></i></span><h3>الشفافية</h3><p>نؤمن بالوضوح في التعاملات والإدارة والمالية، مما يعزز الثقة ويحسّن بيئة العمل وآليات اتخاذ القرار.</p></article>
          <article className="value-card"><span className="value-icon"><i className="fa-solid fa-hand-holding-heart"></i></span><h3>الإحسان</h3><p>نلتزم بالإحسان في كل ما نقدمه من أعمال وفي علاقاتنا داخل الشركة وخارجها، إيمانًا بأن الجودة تبدأ من القيم.</p></article>
          <article className="value-card"><span className="value-icon"><i className="fa-solid fa-lightbulb"></i></span><h3>الابتكار</h3><p>نواكب التغيير ونسعى باستمرار إلى تطوير حلول إبداعية تواكب تطور التكنولوجيا.</p></article>
          <article className="value-card"><span className="value-icon"><i className="fa-solid fa-shield-halved"></i></span><h3>المصداقية</h3><p>نَعِد بما نستطيع الوفاء به فقط، ونلتزم بأقوالنا وأفعالنا؛ لأن الثقة تُبنى ولا تُشترى.</p></article>
          <article className="value-card"><span className="value-icon"><i className="fa-solid fa-user-group"></i></span><h3>التركيز على الإنسان</h3><p>نؤمن أن نجاحنا الحقيقي يأتي من تمكين فريقنا وعملائنا والمجتمع من حولنا.</p></article>
          <article className="value-card"><span className="value-icon"><i className="fa-solid fa-people-group"></i></span><h3>العمل الجماعي</h3><p>نؤمن بأن أفضل النتائج تتحقق من خلال فريق متكامل ومتعاون يجمع خبراته لتحقيق هدف واحد.</p></article>
          <article className="value-card"><span className="value-icon"><i className="fa-solid fa-seedling"></i></span><h3>التطوير المستدام</h3><p>نستثمر باستمرار في تطوير كوادرنا والتقنيات التي تخدم المستقبل وتدعم استمرارية النجاح.</p></article>
        </div>
      </div>
      </section>

      <section className="about-partners" aria-labelledby="about-partners-title">
        <div className="about-section-heading partners-heading">
          <span className="section-kicker">شراكات تصنع الفرق</span>
          <h2 id="about-partners-title">شركاؤنا</h2>
          <p>نتعاون مع نخبة من الشركات التقنية العالمية لتقديم حلول متكاملة تجمع بين الجودة والابتكار والاعتمادية.</p>
        </div>

        <div className="partners-viewport">
          <div className="partners-track">
            <div className="partners-set">
              <a className="partner-logo" href="https://www.eelectron.com/en/" target="_blank" rel="noopener noreferrer" aria-label="زيارة موقع eelectron"><img src="/site-assets/partners/eelectron.webp" alt="eelectron" loading="lazy" /></a>
              <a className="partner-logo" href="https://saltosystems.com/en/" target="_blank" rel="noopener noreferrer" aria-label="زيارة موقع SALTO"><img src="/site-assets/partners/salto.webp" alt="SALTO" loading="lazy" /></a>
              <a className="partner-logo" href="https://www.schrack-seconet.com/" target="_blank" rel="noopener noreferrer" aria-label="زيارة موقع Schrack Seconet"><img src="/site-assets/partners/schrack-seconet.webp" alt="Schrack Seconet" loading="lazy" /></a>
              <a className="partner-logo" href="https://www.eaton.com/us/en-us.html" target="_blank" rel="noopener noreferrer" aria-label="زيارة موقع Eaton"><img src="/site-assets/partners/eaton.webp" alt="Eaton" loading="lazy" /></a>
              <a className="partner-logo" href="https://www.huawei.com/en/" target="_blank" rel="noopener noreferrer" aria-label="زيارة موقع Huawei"><img src="/site-assets/partners/huawei.webp" alt="Huawei" loading="lazy" /></a>
              <a className="partner-logo" href="https://www.cisco.com/" target="_blank" rel="noopener noreferrer" aria-label="زيارة موقع Cisco"><img src="/site-assets/partners/cisco.webp" alt="Cisco" loading="lazy" /></a>
              <a className="partner-logo" href="https://reyee.ruijie.com/en-global/" target="_blank" rel="noopener noreferrer" aria-label="زيارة موقع Reyee"><img src="/site-assets/partners/reyee.webp" alt="Reyee" loading="lazy" /></a>
              <a className="partner-logo" href="https://www.ruijie.com/en-global/" target="_blank" rel="noopener noreferrer" aria-label="زيارة موقع Ruijie"><img src="/site-assets/partners/ruijie.webp" alt="Ruijie" loading="lazy" /></a>
              <a className="partner-logo" href="https://www.hikvision.com/en/" target="_blank" rel="noopener noreferrer" aria-label="زيارة موقع Hikvision"><img src="/site-assets/partners/hikvision.webp" alt="Hikvision" loading="lazy" /></a>
              <a className="partner-logo" href="https://unicableco.com/" target="_blank" rel="noopener noreferrer" aria-label="زيارة موقع Unicable"><img src="/site-assets/partners/unicable.webp" alt="Unicable" loading="lazy" /></a>
              <a className="partner-logo" href="https://www.rovapa.com/" target="_blank" rel="noopener noreferrer" aria-label="زيارة موقع Rovapa"><img src="/site-assets/partners/rovapa.webp" alt="Rovapa" loading="lazy" /></a>
              <a className="partner-logo" href="https://www.fortinet.com/" target="_blank" rel="noopener noreferrer" aria-label="زيارة موقع Fortinet"><img src="/site-assets/partners/fortinet.webp" alt="Fortinet" loading="lazy" /></a>
              <a className="partner-logo" href="https://www.itctech.com.cn/" target="_blank" rel="noopener noreferrer" aria-label="زيارة موقع ITC"><img src="/site-assets/partners/itc.webp" alt="ITC" loading="lazy" /></a>
              <a className="partner-logo" href="https://www.splunk.com/" target="_blank" rel="noopener noreferrer" aria-label="زيارة موقع Splunk"><img src="/site-assets/partners/splunk.webp" alt="Splunk" loading="lazy" /></a>
              <a className="partner-logo" href="https://www.microsoft.com/" target="_blank" rel="noopener noreferrer" aria-label="زيارة موقع Microsoft"><img src="/site-assets/partners/microsoft.webp" alt="Microsoft" loading="lazy" /></a>
              <a className="partner-logo" href="https://www.dell.com/en-us" target="_blank" rel="noopener noreferrer" aria-label="زيارة موقع Dell Technologies"><img src="/site-assets/partners/dell-technologies.webp" alt="Dell Technologies" loading="lazy" /></a>
              <a className="partner-logo" href="https://www.vmware.com/" target="_blank" rel="noopener noreferrer" aria-label="زيارة موقع VMware"><img src="/site-assets/partners/vmware.webp" alt="VMware" loading="lazy" /></a>
            </div>
            <div className="partners-set partners-set-duplicate" aria-hidden="true">
              <a className="partner-logo" href="https://www.eelectron.com/en/" target="_blank" rel="noopener noreferrer" aria-label="زيارة موقع eelectron" tabIndex="-1"><img src="/site-assets/partners/eelectron.webp" alt="" loading="lazy" /></a>
              <a className="partner-logo" href="https://saltosystems.com/en/" target="_blank" rel="noopener noreferrer" aria-label="زيارة موقع SALTO" tabIndex="-1"><img src="/site-assets/partners/salto.webp" alt="" loading="lazy" /></a>
              <a className="partner-logo" href="https://www.schrack-seconet.com/" target="_blank" rel="noopener noreferrer" aria-label="زيارة موقع Schrack Seconet" tabIndex="-1"><img src="/site-assets/partners/schrack-seconet.webp" alt="" loading="lazy" /></a>
              <a className="partner-logo" href="https://www.eaton.com/us/en-us.html" target="_blank" rel="noopener noreferrer" aria-label="زيارة موقع Eaton" tabIndex="-1"><img src="/site-assets/partners/eaton.webp" alt="" loading="lazy" /></a>
              <a className="partner-logo" href="https://www.huawei.com/en/" target="_blank" rel="noopener noreferrer" aria-label="زيارة موقع Huawei" tabIndex="-1"><img src="/site-assets/partners/huawei.webp" alt="" loading="lazy" /></a>
              <a className="partner-logo" href="https://www.cisco.com/" target="_blank" rel="noopener noreferrer" aria-label="زيارة موقع Cisco" tabIndex="-1"><img src="/site-assets/partners/cisco.webp" alt="" loading="lazy" /></a>
              <a className="partner-logo" href="https://reyee.ruijie.com/en-global/" target="_blank" rel="noopener noreferrer" aria-label="زيارة موقع Reyee" tabIndex="-1"><img src="/site-assets/partners/reyee.webp" alt="" loading="lazy" /></a>
              <a className="partner-logo" href="https://www.ruijie.com/en-global/" target="_blank" rel="noopener noreferrer" aria-label="زيارة موقع Ruijie" tabIndex="-1"><img src="/site-assets/partners/ruijie.webp" alt="" loading="lazy" /></a>
              <a className="partner-logo" href="https://www.hikvision.com/en/" target="_blank" rel="noopener noreferrer" aria-label="زيارة موقع Hikvision" tabIndex="-1"><img src="/site-assets/partners/hikvision.webp" alt="" loading="lazy" /></a>
              <a className="partner-logo" href="https://unicableco.com/" target="_blank" rel="noopener noreferrer" aria-label="زيارة موقع Unicable" tabIndex="-1"><img src="/site-assets/partners/unicable.webp" alt="" loading="lazy" /></a>
              <a className="partner-logo" href="https://www.rovapa.com/" target="_blank" rel="noopener noreferrer" aria-label="زيارة موقع Rovapa" tabIndex="-1"><img src="/site-assets/partners/rovapa.webp" alt="" loading="lazy" /></a>
              <a className="partner-logo" href="https://www.fortinet.com/" target="_blank" rel="noopener noreferrer" aria-label="زيارة موقع Fortinet" tabIndex="-1"><img src="/site-assets/partners/fortinet.webp" alt="" loading="lazy" /></a>
              <a className="partner-logo" href="https://www.itctech.com.cn/" target="_blank" rel="noopener noreferrer" aria-label="زيارة موقع ITC" tabIndex="-1"><img src="/site-assets/partners/itc.webp" alt="" loading="lazy" /></a>
              <a className="partner-logo" href="https://www.splunk.com/" target="_blank" rel="noopener noreferrer" aria-label="زيارة موقع Splunk" tabIndex="-1"><img src="/site-assets/partners/splunk.webp" alt="" loading="lazy" /></a>
              <a className="partner-logo" href="https://www.microsoft.com/" target="_blank" rel="noopener noreferrer" aria-label="زيارة موقع Microsoft" tabIndex="-1"><img src="/site-assets/partners/microsoft.webp" alt="" loading="lazy" /></a>
              <a className="partner-logo" href="https://www.dell.com/en-us" target="_blank" rel="noopener noreferrer" aria-label="زيارة موقع Dell Technologies" tabIndex="-1"><img src="/site-assets/partners/dell-technologies.webp" alt="" loading="lazy" /></a>
              <a className="partner-logo" href="https://www.vmware.com/" target="_blank" rel="noopener noreferrer" aria-label="زيارة موقع VMware" tabIndex="-1"><img src="/site-assets/partners/vmware.webp" alt="" loading="lazy" /></a>
            </div>
          </div>
        </div>
      </section>


      <section className="about-operations" aria-labelledby="about-operations-title">
        <div className="about-operations-intro">
          <span className="section-kicker">كيف نعمل</span>
          <h2 id="about-operations-title">كيف تعمل المتقدم؟</h2>
          <p>لكل شركة هيكل تنظيمي يهدف إلى تحقيق تنظيم العمل الداخلي. وفي هذا القسم نعرض الشكل التنظيمي في المتقدم، ليسهل على كل عضو في الفريق معرفة دوره ومسؤولياته والجهات التي تُرفع إليها الاستفسارات أو التقارير.</p>
          <p>نؤمن أن الهيكل التنظيمي ليس قالبًا ثابتًا؛ فللمتقدم خصائصها الخاصة، وليس من الحكمة أخذ نظام هيكلي جاهز وتطبيقه. ومع توسع الشركة، يتم تحديث هذا الهيكل بما يضمن وضوح المسؤوليات وسلاسة اتخاذ القرار.</p>
        </div>

        <div className="operations-grid">
          <article className="operation-card operation-card-featured">
            <span className="operation-icon"><i className="fa-solid fa-sitemap"></i></span>
            <div><h3>الإدارة العامة</h3><p>تُدار شركة المتقدم للحلول التقنية من خلال مجلس إدارة يشرف على رسم التوجهات الاستراتيجية ووضع السياسات العامة، بينما تتولى الإدارة التنفيذية قيادة العمليات اليومية وتنسيق العمل بين الإدارات المختلفة لضمان تحقيق الأهداف المؤسسية بكفاءة. تعتمد الشركة على هيكل تنظيمي مرن قائم على الحوكمة والتكامل بين الفرق، مع متابعة مستمرة للأداء وتطوير العمليات بما يضمن جودة التنفيذ واستدامة النمو.</p></div>
          </article>

          <article className="operation-card"><span className="operation-icon"><i className="fa-solid fa-chart-line"></i></span><h3>الإدارة المالية</h3><p>تتولى قيادة العمليات الحسابية وإدارة الموارد المالية وإعداد التقارير الدورية ومتابعة الإيرادات والالتزامات والميزانيات، مع تطبيق الضوابط الداخلية وتزويد الإدارة العليا بالمعلومات الداعمة للقرارات الاستراتيجية.</p></article>
          <article className="operation-card"><span className="operation-icon"><i className="fa-solid fa-diagram-project"></i></span><h3>إدارة المشاريع</h3><p>تُعنى بالتخطيط والتنظيم والتنفيذ والمتابعة الكاملة لمشروعات العملاء، وقيادة فرق مواقع التنفيذ ووضع الخطط الزمنية والموارد، وتنسيق مهام مهندسي المواقع والتشغيل لضمان توافق النتائج مع المتطلبات الفنية بكفاءة واحترافية.</p></article>
          <article className="operation-card"><span className="operation-icon"><i className="fa-solid fa-cart-flatbed"></i></span><h3>إدارة المبيعات والمشتريات</h3><p>تتولى تنمية قاعدة العملاء وتأمين احتياجات المشاريع وإعداد العروض التجارية وإدارة علاقات الموردين، بما يحقق التوازن بين الجودة والتكلفة والموعد ويضمن توفر المواد واستمرارية التنفيذ.</p></article>
          <article className="operation-card"><span className="operation-icon"><i className="fa-solid fa-users-gear"></i></span><h3>الكفاءات البشرية</h3><p>نعتمد على فريق متكامل من الكفاءات الفنية والإدارية، يضم مهندسي المواقع والتنفيذ، وفريق التسويق والإعلام، وفريق تشغيل الأنظمة والدعم الفني المسؤول عن إدارة البنية التحتية ومراقبة الأنظمة وتطبيق معايير الأمن لضمان استقرار الخدمات.</p></article>
        </div>
      </section>

      <section className="contact-cta about-community" aria-labelledby="about-community-title">
        <div className="contact-cta-copy">
          <span className="section-kicker">أثر يتجاوز التقنية</span>
          <h2 id="about-community-title">المسؤولية الاجتماعية</h2>
          <p>انطلاقًا من التزامنا بدعم المجتمع وتعزيز الاقتصاد المحلي، نحرص في MCTC على توفير فرص تدريب مخصصة لحديثي التخرج لتمكينهم من اكتساب الخبرة العملية وتطوير مهاراتهم. كما نعمل على توفير فرص عمل متميزة بعد انتهاء فترة التدريب للكفاءات الواعدة، إيمانًا منا بأهمية الاستثمار في الطاقات المحلية وبناء كوادر قادرة على الإسهام الفعال في التنمية المستدامة.</p>
        </div>
      </section>
    </div>
  );
}
