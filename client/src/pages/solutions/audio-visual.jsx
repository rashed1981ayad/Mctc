import React from "react";
import { Link } from "react-router-dom";
import { useWorkflowReveal } from "../../hooks/useWorkflowReveal.js";
import "../../styles/reference.ar.css";

export default function AudioVisualPage() {
  useWorkflowReveal();
  return (
<div className="enterprise-main audio-visual-main">
      <section className="enterprise-hero audio-visual-hero" aria-labelledby="audio-visual-hero-title">
        <img src="/site-assets/audio-visual-hero.webp" alt="قاعة اجتماعات حديثة ترمز إلى الأنظمة الصوتية والمرئية وحلول الاتصال العام" />
        <div className="enterprise-hero-shade"></div>
        <div className="enterprise-hero-content">
          <h1 id="audio-visual-hero-title">نصمم أنظمة صوتية ومرئية متكاملة تعزز التواصل داخل المؤسسات</h1>
          <p>توفر تجربة احترافية للاجتماعات والعروض وإدارة الرسائل العامة داخل المباني والمنشآت.</p>
        </div>
      </section>

      <section className="enterprise-introduction audio-visual-introduction" aria-label="مقدمة عن الأنظمة الصوتية والمرئية وأنظمة الاتصال العام">
        <div className="enterprise-introduction-inner">
          <p className="enterprise-intro-text">تلعب الأنظمة الصوتية والمرئية دورًا محوريًا في تعزيز التواصل داخل المؤسسات والمساحات العامة، حيث تتيح إيصال المعلومات بوضوح وتنظيم الاجتماعات والعروض التقديمية وإدارة الرسائل العامة بكفاءة عالية. نوفر في <strong>المتقدم</strong> حلولًا متكاملة في مجال الأنظمة الصوتية والمرئية وأنظمة الاتصال العام، مصممة لتحسين تجربة التواصل داخل المباني والمؤسسات.</p>
          <p className="enterprise-intro-text">تعتمد حلولنا على تقنيات حديثة قابلة للتكامل مع البنية التحتية للشبكات وأنظمة المباني الذكية، مما يتيح بيئة تواصل متطورة ومرنة تدعم متطلبات العمل الحديثة.</p>
        </div>
      </section>

      <section className="enterprise-services audio-visual-scope" aria-labelledby="audio-visual-scope-title">
        <div className="enterprise-services-inner">
          <div className="enterprise-services-lead">
            <h2 id="audio-visual-scope-title">نطاق حلول الأنظمة الصوتية والمرئية</h2>
          </div>

          <div className="enterprise-services-grid">
            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-bullhorn" aria-hidden="true"></i><h3>أنظمة النداء العام والإخلاء الصوتي</h3></div>
              <p>أنظمة اتصال صوتي مركزية لبث الرسائل والإعلانات داخل المباني، إضافة إلى توجيه التعليمات أثناء حالات الطوارئ، مما يساعد على تنظيم التواصل وضمان إخلاء آمن ومنظم.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-volume-high" aria-hidden="true"></i><h3>الأنظمة الصوتية الاحترافية</h3></div>
              <p>تصميم وتنفيذ أنظمة صوتية عالية الجودة توفر توزيعًا متوازنًا وواضحًا للصوت داخل القاعات والمسارح وقاعات الاجتماعات والمساحات العامة.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-tv" aria-hidden="true"></i><h3>أنظمة العرض المرئي والشاشات الرقمية</h3></div>
              <p>حلول عرض مرئي متطورة تشمل الشاشات الاحترافية وأنظمة <bdi>Digital Signage</bdi> التي تتيح عرض المحتوى الإعلامي والإعلاني والمعلوماتي بطريقة ديناميكية وسهلة التحديث.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-video" aria-hidden="true"></i><h3>أنظمة المؤتمرات والتعاون</h3></div>
              <p>حلول مؤتمرات متقدمة تدعم الاجتماعات الحضورية والافتراضية، وتشمل تقنيات عرض المحتوى، وأنظمة الصوت والميكروفونات، وكاميرات المؤتمرات.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-sliders" aria-hidden="true"></i><h3>أنظمة التحكم المركزية</h3></div>
              <p>منصات تحكم موحدة تتيح إدارة الأنظمة الصوتية والمرئية والإضاءة وأجهزة العرض من خلال لوحة تحكم واحدة أو تطبيق ذكي، مما يسهل التشغيل ويعزز تجربة المستخدم.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="enterprise-workflow audio-visual-why" aria-labelledby="audio-visual-why-title">
        <div className="enterprise-workflow-inner">
          <div className="enterprise-workflow-heading">
            <span>حلول مدروسة وتجربة متكاملة</span>
            <h2 id="audio-visual-why-title">لماذا المتقدم في حلول الأنظمة الصوتية والمرئية؟</h2>
          </div>

          <div className="enterprise-workflow-steps" role="list">
            <div className="enterprise-workflow-line" aria-hidden="true"></div>
            <article className="enterprise-workflow-step is-visible" role="listitem">
              <span className="enterprise-workflow-number">01</span>
              <h3>تصميم مخصص لبيئة الاستخدام</h3>
              <p>نبدأ بدراسة طبيعة المنشأة ومتطلبات التواصل داخلها لتصميم نظام صوتي ومرئي يحقق أفضل أداء ممكن.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">02</span>
              <h3>تكامل مع البنية التقنية</h3>
              <p>نضمن تكامل الأنظمة الصوتية والمرئية مع الشبكات وأنظمة المباني الذكية لضمان استقرار الأداء وسهولة الإدارة.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">03</span>
              <h3>تنفيذ احترافي</h3>
              <p>تنفيذ الأنظمة بواسطة فريق متخصص يضمن جودة التركيب ودقة المعايرة لتحقيق أفضل تجربة صوتية ومرئية.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">04</span>
              <h3>حلول قابلة للتوسع</h3>
              <p>تصميم الأنظمة بطريقة تسمح بتطويرها مستقبلًا حسب نمو احتياجات المؤسسة.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="contact-cta enterprise-contact-cta" aria-labelledby="audio-visual-cta-title">
        <div className="contact-cta-copy">
          <h2 id="audio-visual-cta-title">طوّر بيئة التواصل داخل مؤسستك</h2>
          <p>نساعدك على تصميم منظومة صوتية ومرئية متكاملة تعزز التواصل داخل مؤسستك وتدعم بيئة عمل أكثر كفاءة واحترافية. مع المتقدم، تتحول بيئة العمل إلى مساحة تواصل ذكية تجمع بين وضوح الصوت، وقوة الصورة، وسهولة التحكم في التجربة التقنية.</p>
        </div>
        <Link className="contact-cta-button" to="/contact">اطلب عرضًا فنيًا لنظامك <span aria-hidden="true">←</span></Link>
      </section>
    </div>
  );
}
