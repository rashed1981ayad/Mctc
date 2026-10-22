import React from "react";
import { Link } from "react-router-dom";
import { useWorkflowReveal } from "../../hooks/useWorkflowReveal.js";
import "../../styles/reference.ar.css";

export default function RetailPage() {
  useWorkflowReveal();
  return (
<div className="enterprise-main retail-main">
      <section className="enterprise-hero retail-hero" aria-labelledby="retail-hero-title">
        <img src="/site-assets/retail-hero.webp" alt="حلول اتصال وشبكات موثوقة لدعم أعمال البيع بالتجزئة" />
        <div className="enterprise-hero-shade"></div>
        <div className="enterprise-hero-content">
          <h1 id="retail-hero-title">نوفر حلولًا ومنتجات تقنية موثوقة تدعم التشغيل اليومي للأعمال، وتضمن أداءً مستقراً وسهولة إدارة الأنظمة مع جاهزية للتوسع والنمو المستقبلي.</h1>
        </div>
      </section>

      <section className="enterprise-introduction retail-introduction" aria-labelledby="retail-audience-title">
        <div className="enterprise-introduction-inner">
          <div className="retail-intro-copy">
            <p className="enterprise-intro-text">تعتمد بيئات العمل الحديثة وقطاع التجزئة على أنظمة تقنية مستقرة وسهلة التشغيل لضمان استمرارية الأداء اليومي دون تعقيد تقني أو تأخير تشغيلي. لذلك تقدم <strong>المتقدم</strong> حلول <strong>بيع الأجهزة والأنظمة</strong> كجزء من منظومة خدماتها التقنية، من خلال توفير منتجات وأنظمة معتمدة عالميًا تم اختيارها بعناية لتلبية احتياجات الشركات والمكاتب والمشاريع التجارية بمختلف أحجامها.</p>
            <p className="enterprise-intro-text">نركّز على توفير الأنظمة الأساسية عالية الاعتمادية التي تشكّل العمود الفقري للبنية التقنية، مع إمكانية التوريد والتركيب والبرمجة والتشغيل والدعم الفني عبر فريق متخصص يضمن جاهزية الحل منذ اليوم الأول.</p>
          </div>

          <div className="enterprise-audience-layout">
            <div className="enterprise-audience-heading">
              <span>الفئات المستفيدة</span>
              <h2 id="retail-audience-title">لمن هذه الحلول؟</h2>
            </div>

            <div className="enterprise-audience-grid" role="list">
              <article className="enterprise-audience-card" role="listitem"><span>المقاولين وشركات المقاولات</span></article>
              <article className="enterprise-audience-card" role="listitem"><span>متاجر التجزئة ومنافذ البيع</span></article>
              <article className="enterprise-audience-card" role="listitem"><span>الشركات والمكاتب</span></article>
              <article className="enterprise-audience-card" role="listitem"><span>المشاريع التجارية بمختلف أحجامها</span></article>
              <article className="enterprise-audience-card" role="listitem"><span>الفروع متعددة المواقع</span></article>
              <article className="enterprise-audience-card" role="listitem"><span>المرافق وبيئات التشغيل اليومية</span></article>
              <article className="enterprise-audience-card" role="listitem"><span>المنشآت بحاجة أنظمة أمن وسلامة موثوقة</span></article>
            </div>
          </div>
        </div>
      </section>

      <section className="enterprise-services retail-services" aria-labelledby="retail-services-title">
        <div className="enterprise-services-inner">
          <div className="enterprise-services-lead">
            <h2 id="retail-services-title">أنظمة ومنتجات <bdi>Retail</bdi> التقنية</h2>
            <p>نوفّر منظومة متكاملة من المنتجات والحلول التقنية المصممة لدعم الاتصال، الأمان، والسلامة التشغيلية، مع ضمان التوافق بين الأنظمة وسهولة إدارتها داخل بيئات العمل اليومية.</p>
          </div>

          <div className="enterprise-services-grid">
            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-network-wired" aria-hidden="true"></i><div><h3>حلول الشبكات والبنية التحتية</h3><span className="retail-service-english" dir="ltr">Networking &amp; Connectivity</span></div></div>
              <p>نوفر حلول شبكات متكاملة تضمن اتصالاً مستقراً وآمناً يدعم العمليات اليومية، بدءًا من أجهزة التوجيه والمبدلات وأنظمة <bdi>Wi-Fi</bdi> عالية الأداء، وصولًا إلى حلول إدارة الشبكات المناسبة للمكاتب الصغيرة والفروع متعددة النقاط، بما يحقق أداءً موثوقًا وسهولة في التوسع.</p>
              <p className="retail-service-partners"><strong>شركاء الشبكات:</strong><span className="retail-partner-logos"><img src="/site-assets/partners/ruijie.webp" alt="Ruijie Networks" /><img src="/site-assets/partners/reyee.webp" alt="Reyee" /><img src="/site-assets/partners/huawei.webp" alt="Huawei" /><img src="/site-assets/partners/cisco.webp" alt="Cisco" /></span></p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-video" aria-hidden="true"></i><div><h3>أنظمة المراقبة والأمن</h3><span className="retail-service-english" dir="ltr">Security &amp; Surveillance</span></div></div>
              <p>نقدّم أنظمة مراقبة وأمن متكاملة تعتمد على تقنيات الرؤية الرقمية الذكية لتأمين المتاجر والمكاتب والمرافق التشغيلية، وتشمل حلول تسجيل وإدارة الفيديو مع إمكانية التكامل مع الأنظمة التقنية الأخرى لتعزيز مستوى الأمان والمتابعة التشغيلية. كما نوفر أنظمة البصمة وتسجيل الحضور والانصراف وأنظمة التحكم بالدخول، بما يساهم في تنظيم حركة الموظفين والزوار وتوفير سجل دقيق لإدارة الوصول والدوام ضمن بيئة تشغيل موثوقة وسهلة الإدارة.</p>
              <p className="retail-service-partners"><strong>حلول أمن معتمدة من:</strong><span className="retail-partner-logos"><img src="/site-assets/partners/hikvision.webp" alt="Hikvision" /></span></p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-fire-flame-curved" aria-hidden="true"></i><div><h3>أنظمة إنذار وكشف الحريق</h3><span className="retail-service-english" dir="ltr">Fire Alarm Systems</span></div></div>
              <p>نوفر أنظمة إنذار حريق موثوقة ومتوافقة مع المعايير الدولية، تشمل الحلول التقليدية والمعنونة وأنظمة الإخلاء الصوتي، مع دعم كامل لعمليات التصميم والتركيب والاختبار لضمان سلامة المنشآت واستمرارية التشغيل.</p>
              <p className="retail-service-partners"><strong>شركاء الحلول:</strong><span className="retail-partner-logos"><img src="/site-assets/partners/eaton.webp" alt="Eaton" /></span></p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-ethernet" aria-hidden="true"></i><div><h3>وسائط الشبكة وكوابل البنية التحتية</h3><span className="retail-service-english" dir="ltr">Cabling &amp; Media</span></div></div>
              <p>نوفّر كوابل ووسائط شبكة عالية الجودة تضمن استقرار الأداء وطول عمر البنية التحتية، مع حلول تمديد منظمة وملحقات تركيب تدعم بيئات العمل المختلفة وتسهّل عمليات الصيانة والتوسعة المستقبلية.</p>
              <p className="retail-service-partners"><strong>منتجات موثوقة من:</strong><span className="retail-partner-logos"><img src="/site-assets/partners/unicable.webp" alt="Unicable" /></span></p>
            </article>

            <article className="enterprise-service-card enterprise-service-card-wide">
              <div className="enterprise-service-title"><i className="fa-solid fa-layer-group" aria-hidden="true"></i><div><h3>حلول وأنظمة إضافية</h3><span className="retail-service-english" dir="ltr">Extended Retail Solutions</span></div></div>
              <p>نوفّر إمكانية توريد وتشغيل مجموعة واسعة من الأنظمة التقنية حسب متطلبات المشروع، بما يشمل أنظمة المباني الذكية، الحلول السحابية، الافتراضية وإدارة الخوادم، الأمن السيبراني، مراكز البيانات، وأنظمة التحكم بالدخول، ضمن منظومة شركاء تقنيين عالميين تضمن اختيار الحل الأنسب فنيًا لكل حالة استخدام.</p>
              <p className="retail-service-partners"><strong>من شركائنا التقنيين:</strong><span className="retail-partner-logos"><img src="/site-assets/partners/eelectron.webp" alt="Eelectron" /><img src="/site-assets/partners/vmware.webp" alt="VMware" /><img src="/site-assets/partners/microsoft.webp" alt="Microsoft" /><img src="/site-assets/partners/dell.webp" alt="Dell Technologies" /><img src="/site-assets/partners/splunk.webp" alt="Splunk" /><img src="/site-assets/partners/salto.webp" alt="Salto Systems" /><img src="/site-assets/partners/schrack-seconet.webp" alt="Schrack Seconet" /><img src="/site-assets/partners/knx.webp" alt="KNX" /><img src="/site-assets/partners/itc.webp" alt="ITC" /><img src="/site-assets/partners/rovapa.webp" alt="Rovapa" /><img src="/site-assets/partners/fortinet.webp" alt="Fortinet" /></span></p>
            </article>
          </div>
        </div>
      </section>

      <section className="enterprise-workflow retail-trust" aria-labelledby="retail-trust-title">
        <div className="enterprise-workflow-inner">
          <div className="enterprise-workflow-heading">
            <span>شراكة تقنية يمكنك الاعتماد عليها</span>
            <h2 id="retail-trust-title">لماذا تثق في المتقدم</h2>
          </div>

          <div className="enterprise-workflow-steps" role="list">
            <div className="enterprise-workflow-line" aria-hidden="true"></div>
            <article className="enterprise-workflow-step is-visible" role="listitem">
              <span className="enterprise-workflow-number">01</span>
              <h3>منتجات موثوقة ومعتمدة عالميًا</h3>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">02</span>
              <h3>توفر سريع وتنفيذ احترافي</h3>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">03</span>
              <h3>تكامل كامل مع خدمات التركيب والتشغيل</h3>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">04</span>
              <h3>دعم فني محلي بخبرة ميدانية</h3>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">05</span>
              <h3>حلول قابلة للتوسع مستقبلاً</h3>
            </article>
          </div>
        </div>
      </section>

      <section className="contact-cta retail-contact-cta" aria-labelledby="retail-cta-title">
        <div className="contact-cta-copy">
          <h2 id="retail-cta-title">هل تبحث عن حلول تقنية موثوقة تدعم تشغيل أعمالك اليومية؟</h2>
          <p>نحدد معك نطاق الحل المناسب ونقدم تصورًا واضحًا للتنفيذ بناءً على حجم العمل وطبيعة النشاط، مع إمكانية التوسع لاحقًا دون إعادة بناء البنية من الصفر.</p>
        </div>
        <Link className="contact-cta-button" to="/contact">تواصل مع فريق المبيعات <span aria-hidden="true">←</span></Link>
      </section>
    </div>
  );
}
