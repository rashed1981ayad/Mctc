import React from "react";
import { Link } from "react-router-dom";
import { useWorkflowReveal } from "../../hooks/useWorkflowReveal.js";
import "../../styles/reference.ar.css";

export default function SmallOfficePage() {
  useWorkflowReveal();
  return (
<div className="enterprise-main small-office-main">
      <section className="enterprise-hero small-office-hero" aria-labelledby="small-office-hero-title">
        <img src="/site-assets/small-office-hero.webp" alt="مكتب حديث يرمز إلى حلول تقنية موثوقة للأعمال والمكاتب الصغيرة" />
        <div className="enterprise-hero-shade"></div>
        <div className="enterprise-hero-content">
          <h1 id="small-office-hero-title">نُمكّن أعمالك من النمو والاستقرار عبر حلول تقنية موثوقة وآمنة، مصممة لدعم كفاءة التشغيل ومواكبة متطلبات المستقبل الرقمي.</h1>
        </div>
      </section>

      <section className="enterprise-introduction small-office-introduction" aria-labelledby="small-office-audience-title">
        <div className="enterprise-introduction-inner">
          <p className="enterprise-intro-text">في المتقدم، ندرك أن الأعمال الصغيرة تحتاج إلى حلول تقنية <strong>عملية وموثوقة وبتكلفة مدروسة</strong> تضمن استمرارية التشغيل دون تعقيد أو أعباء تشغيلية عالية. لذلك صممنا حزمة <bdi><strong>Small Office Projects</strong></bdi> لتكون بنية تقنية متكاملة وجاهزة للتشغيل، تدعم احتياجات اليوم وتسهّل التوسع لاحقًا.</p>

          <div className="enterprise-audience-layout">
            <div className="enterprise-audience-heading">
              <span>الفئات المستفيدة</span>
              <h2 id="small-office-audience-title">لمن هذا الحل؟</h2>
            </div>

            <div className="enterprise-audience-grid" role="list">
              <article className="enterprise-audience-card" role="listitem"><span>المكاتب الإدارية</span></article>
              <article className="enterprise-audience-card" role="listitem"><span>الشركات الناشئة <bdi>(Startups)</bdi></span></article>
              <article className="enterprise-audience-card" role="listitem"><span>العيادات والمراكز الطبية</span></article>
              <article className="enterprise-audience-card" role="listitem"><span>مكاتب المحاماة والاستشارات</span></article>
              <article className="enterprise-audience-card" role="listitem"><span>شركات الخدمات</span></article>
              <article className="enterprise-audience-card" role="listitem"><span>الفروع الصغيرة للشركات الكبرى</span></article>
            </div>
          </div>
        </div>
      </section>

      <section className="enterprise-services small-office-services" aria-labelledby="small-office-services-title">
        <div className="enterprise-services-inner">
          <div className="enterprise-services-lead">
            <h2 id="small-office-services-title">أنظمة وحلول لمشاريع <bdi>Small Office</bdi></h2>
            <p>نقدّم نطاقًا متكاملاً يشمل التصميم، التنفيذ، التشغيل، والدعم الفني، مع مراعاة حجم العمل وطبيعة النشاط، وبأسلوب يضمن وضوح المسؤوليات وسهولة إدارة الأنظمة داخل بيئة المكتب.</p>
          </div>

          <figure className="enterprise-services-visual">
            <img src="/site-assets/small-office-services.webp" alt="مخطط توضيحي لحلول الشبكات والخوادم والمراقبة والاتصال للمكاتب الصغيرة" loading="lazy" />
          </figure>

          <div className="enterprise-services-grid">
            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-wifi" aria-hidden="true"></i><h3>شبكات <bdi>LAN</bdi> و<bdi>Wi-Fi</bdi></h3></div>
              <p>تصميم وتنفيذ شبكة سلكية ولاسلكية تغطي المكتب بكفاءة، مع إعدادات تضمن الاستقرار وسهولة الإدارة وتحسين تجربة الاستخدام اليومية.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-network-wired" aria-hidden="true"></i><h3>تمديد كوابل وألياف</h3></div>
              <p>تنفيذ بنية تحتية منظمة للكوابل النحاسية والألياف وفق تركيب نظيف ومدروس، لتقليل الأعطال ودعم التوسع وإعادة الهيكلة لاحقًا.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-cloud" aria-hidden="true"></i><h3>خوادم صغيرة أو حلول سحابية</h3></div>
              <p>إعداد خادم مكتبي أو حلول سحابية مناسبة لإدارة الملفات والخدمات الأساسية، مع ضبط الصلاحيات وفق احتياج فريقك وطبيعة عملك.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-shield-halved" aria-hidden="true"></i><h3>حماية وأمن أساسي للشبكة والبيانات</h3></div>
              <p>تطبيق طبقة حماية مناسبة لبيئات الأعمال الصغيرة؛ إعدادات أمان للشبكة، حماية للأجهزة، وسياسات وصول مبسطة تقلّل المخاطر التشغيلية.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-video" aria-hidden="true"></i><h3>أنظمة المراقبة والتحكم بالدخول</h3></div>
              <p>تركيب كاميرات مراقبة وأنظمة حضور وانصراف وتحكم دخول تساعدك على متابعة المنشأة ورفع مستوى الأمان دون تعقيد.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-fire-extinguisher" aria-hidden="true"></i><h3>أنظمة إنذار وكشف حريق</h3></div>
              <p>توريد وتركيب أنظمة كشف وإنذار حريق موثوقة قابلة للتكامل مع متطلبات الموقع، بهدف تعزيز السلامة ودعم استمرارية الأعمال.</p>
            </article>

            <article className="enterprise-service-card enterprise-service-card-wide">
              <div className="enterprise-service-title"><i className="fa-solid fa-display" aria-hidden="true"></i><h3>الأنظمة الصوتية والمرئية والاتصالات</h3></div>
              <p>نقدم حلولًا عملية لتجهيز أنظمة الصوت الداخلي وقاعات الاجتماعات والعرض بما يضمن تجربة تشغيل سهلة ومستقرة، مع إمكانية تشغيل أنظمة الاتصال الداخلي عبر الشبكة عند الحاجة، مما يعزز التواصل بين الأقسام ويساعد على تحسين التواصل اليومي داخل المكتب.</p>
            </article>

            <article className="enterprise-service-card enterprise-service-card-wide">
              <div className="enterprise-service-title"><i className="fa-solid fa-screwdriver-wrench" aria-hidden="true"></i><h3>دعم فني وإدارة وصيانة</h3></div>
              <p>دعم فني حضوري وعن بُعد، صيانة دورية، ونسخ احتياطي أساسي للبيانات للمحافظة على استقرار العمل؛ تجهيز أجهزة الموظفين وتنظيم المستخدمين والإعدادات ومتابعة التشغيل لضمان بيئة عمل مستقرة.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="enterprise-workflow small-office-workflow" aria-labelledby="small-office-workflow-title">
        <div className="enterprise-workflow-inner">
          <div className="enterprise-workflow-heading">
            <span>خطوات واضحة وتنفيذ عملي</span>
            <h2 id="small-office-workflow-title">منهجية العمل</h2>
            <p>نطبّق في مشاريع <bdi>Small Office</bdi> منهجية مبسطة ولكن احترافية.</p>
          </div>

          <div className="enterprise-workflow-steps" role="list">
            <div className="enterprise-workflow-line" aria-hidden="true"></div>
            <article className="enterprise-workflow-step is-visible" role="listitem">
              <span className="enterprise-workflow-number">01</span>
              <h3>تحليل الاحتياجات</h3>
              <p>فهم طبيعة العمل، عدد المستخدمين، ومتطلبات التشغيل.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">02</span>
              <h3>التصميم الفني</h3>
              <p>تصميم حل مناسب يوازن بين الأداء، التكلفة، وقابلية التوسع.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">03</span>
              <h3>التنفيذ والتركيب</h3>
              <p>تنفيذ سريع ومنظم مع الالتزام بالمعايير الفنية.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">04</span>
              <h3>الاختبار والتشغيل</h3>
              <p>اختبار الأنظمة وتسليمها جاهزة للعمل.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">05</span>
              <h3>الدعم وخدمة ما بعد البيع</h3>
              <p>ضمان استمرارية العمل من خلال الدعم الفني والصيانة.</p>
            </article>
          </div>
        </div>
      </section>

      <aside className="small-office-workflow-outcome" aria-label="نتيجة منهجية العمل">
        <p>لضمان حل مصمم حسب حجم النشاط وطبيعة المكتب، مع تنفيذ سريع ومنظم دون تعطيل العمل، وتكلفة مدروسة دون التنازل عن الجودة، وقابلية للتوسع مع نمو الشركة، ودعم فني موثوق لضمان الاستمرارية.</p>
      </aside>

      <section className="contact-cta enterprise-contact-cta" aria-labelledby="small-office-cta-title">
        <div className="contact-cta-copy">
          <h2 id="small-office-cta-title">هل تريد تجهيز بيئة تقنية مستقرة لمكتبك؟</h2>
          <p>نحدد معك نطاق الحل المناسب ونقدم تصورًا واضحًا للتنفيذ بناءً على حجم العمل وطبيعة النشاط، مع إمكانية التوسع لاحقًا دون إعادة بناء البنية من الصفر.</p>
        </div>
        <Link className="contact-cta-button" to="/contact">اطلب تقييمًا سريعًا لاحتياج مكتبك <span aria-hidden="true">←</span></Link>
      </section>
    </div>
  );
}
