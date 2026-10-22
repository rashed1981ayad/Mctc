import React from "react";
import { Link } from "react-router-dom";
import { useWorkflowReveal } from "../../hooks/useWorkflowReveal.js";
import "../../styles/reference.ar.css";

export default function DataCenterPage() {
  useWorkflowReveal();
  return (
<div className="enterprise-main data-center-main">
      <section className="enterprise-hero data-center-hero" aria-labelledby="data-center-hero-title">
        <img src="/site-assets/data-center-hero.webp" alt="خزائن خوادم داخل مركز بيانات عالي الجاهزية" />
        <div className="enterprise-hero-shade"></div>
        <div className="enterprise-hero-content">
          <h1 id="data-center-hero-title">نصمم مراكز بيانات عالية الجاهزية</h1>
          <p>تضمن استمرارية العمليات، وتسريع الوصول إلى البيانات، ودعم النمو الرقمي بثقة واستقرار.</p>
        </div>
      </section>

      <section className="enterprise-introduction data-center-introduction" aria-label="مقدمة عن مراكز البيانات">
        <div className="enterprise-introduction-inner">
          <p className="enterprise-intro-text">مع التوسع المتسارع في حجم البيانات والاعتماد الكامل على التطبيقات والخدمات الرقمية، لم تعد مراكز البيانات مجرد مرافق تقنية، بل أصبحت البنية الأساسية التي تعتمد عليها استمرارية الأعمال وأداء الأنظمة الحيوية.</p>
          <p className="enterprise-intro-text">توفر <strong>المتقدم</strong> حلول مراكز بيانات متكاملة تجمع بين الكفاءة التشغيلية، والأمان الفيزيائي، والقدرة على التوسع المستقبلي؛ لتوفير بيئة تقنية مستقرة تدعم نمو مؤسستك دون انقطاع أو تعقيد.</p>
          <p className="enterprise-intro-text">نحن لا نبني مجرد بنية تحتية، بل نصمم بيئات تشغيلية ذكية تقلل المخاطر، وتحسّن الكفاءة، وتضمن أعلى مستويات الجاهزية.</p>
        </div>
      </section>

      <section className="enterprise-services data-center-scope" aria-labelledby="data-center-scope-title">
        <div className="enterprise-services-inner">
          <div className="enterprise-services-lead">
            <h2 id="data-center-scope-title">عناصر البنية التحتية المتكاملة</h2>
          </div>
          <div className="enterprise-services-grid">
            <article className="enterprise-service-card"><div className="enterprise-service-title"><i className="fa-solid fa-building-shield" aria-hidden="true"></i><h3>البنية الفيزيائية والمنشأة <bdi>(Infrastructure &amp; Facility)</bdi></h3></div><p>تصميم المساحات، وأنظمة إطفاء الحريق، والتحكم في الدخول، وتأمين البيئة الفيزيائية لضمان حماية الأصول التقنية من المخاطر التشغيلية.</p></article>
            <article className="enterprise-service-card"><div className="enterprise-service-title"><i className="fa-solid fa-bolt" aria-hidden="true"></i><h3>الطاقة والتبريد</h3></div><p>حلول طاقة غير منقطعة <bdi>(UPS)</bdi>، ومولدات احتياطية، وأنظمة تبريد ذكية موفرة للطاقة تحافظ على استقرار الأداء وتمنع التوقف المفاجئ.</p></article>
            <article className="enterprise-service-card"><div className="enterprise-service-title"><i className="fa-solid fa-server" aria-hidden="true"></i><h3>الحوسبة والتخزين</h3></div><p>خوادم وأنظمة تخزين عالية الأداء تدعم التطبيقات وقواعد البيانات الحيوية، مع قابلية توسع مرنة لتلبية احتياجات النمو المستقبلي.</p></article>
          </div>
        </div>
      </section>

      <section className="enterprise-workflow data-center-why" aria-labelledby="data-center-why-title">
        <div className="enterprise-workflow-inner">
          <div className="enterprise-workflow-heading">
            <span>جاهزية مستمرة وبنية تنمو مع أعمالك</span>
            <h2 id="data-center-why-title">لماذا المتقدم في حلول مراكز البيانات؟</h2>
          </div>
          <div className="enterprise-workflow-steps" role="list">
            <div className="enterprise-workflow-line" aria-hidden="true"></div>
            <article className="enterprise-workflow-step is-visible" role="listitem"><span className="enterprise-workflow-number">01</span><h3>تصميم قابل للتوسع</h3><p>مراكز بيانات تنمو مع نمو أعمالك دون الحاجة لإعادة بناء البنية الأساسية.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">02</span><h3>كفاءة تشغيلية مستدامة</h3><p>حلول تركز على تقليل استهلاك الطاقة وخفض التكاليف التشغيلية.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">03</span><h3>تكامل شامل</h3><p>تناغم كامل بين الشبكات، والتخزين، والأمن لضمان تدفق بيانات آمن ومستقر.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">04</span><h3>دعم فني متخصص</h3><p>فريق تقني يعمل معك لضمان استقرار البيئة وتحسين أدائها المستمر.</p></article>
          </div>
        </div>
      </section>

      <section className="contact-cta enterprise-contact-cta" aria-labelledby="data-center-cta-title">
        <div className="contact-cta-copy">
          <h2 id="data-center-cta-title">هل تحتاج إلى بنية تحتية رقمية أكثر جاهزية واستقرارًا؟</h2>
          <p>نساعدك على تصميم أو تطوير مركز بيانات يحقق التوازن بين الأداء، والكفاءة، وقابلية التوسع، دون تعطيل عملياتك الحيوية.</p>
        </div>
        <Link className="contact-cta-button" to="/contact">اطلب تقييمًا لمركز البيانات الحالي <span aria-hidden="true">←</span></Link>
      </section>
    </div>
  );
}
