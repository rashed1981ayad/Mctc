import React from "react";
import { Link } from "react-router-dom";
import { useWorkflowReveal } from "../../hooks/useWorkflowReveal.js";
import "../../styles/reference.ar.css";

export default function CctvPage() {
  useWorkflowReveal();
  return (
<div className="enterprise-main cctv-main">
      <section className="enterprise-hero cctv-hero" aria-labelledby="cctv-hero-title">
        <img src="/site-assets/cctv-hero.webp" alt="كاميرا مراقبة احترافية لتعزيز أمن المنشآت" />
        <div className="enterprise-hero-shade"></div>
        <div className="enterprise-hero-content">
          <h1 id="cctv-hero-title">نصمم وننفذ أنظمة مراقبة احترافية متكاملة</h1>
          <p>تعزز أمان منشأتك وتمنحك رؤية تشغيلية دقيقة وموثوقة في جميع الأوقات.</p>
        </div>
      </section>

      <section className="enterprise-introduction cctv-introduction" aria-label="مقدمة عن أنظمة المراقبة">
        <div className="enterprise-introduction-inner">
          <p className="enterprise-intro-text">أصبحت أنظمة المراقبة عنصرًا أساسيًا في إدارة المخاطر وتعزيز السلامة التشغيلية داخل المؤسسات بمختلف قطاعاتها. لم تعد المراقبة مجرد تسجيل للأحداث، بل أصبحت منظومة متكاملة تساهم في حماية الأصول، ودعم اتخاذ القرار، وتحسين سرعة الاستجابة للحوادث. نوفر في <strong>المتقدم</strong> حلول <bdi>CCTV</bdi> متكاملة مصممة وفق طبيعة كل منشأة، مع التركيز على الجودة، والاعتمادية، والتكامل مع البنية التحتية التقنية لضمان حماية مستدامة وفق أعلى المعايير.</p>
          <p className="enterprise-intro-text">نحن لا نركّب كاميرات فقط، بل نبني منظومة مراقبة ذكية تدعم استقرار أعمالك على المدى الطويل.</p>
        </div>
      </section>

      <section className="enterprise-services cctv-scope" aria-labelledby="cctv-scope-title">
        <div className="enterprise-services-inner">
          <div className="enterprise-services-lead">
            <h2 id="cctv-scope-title">نطاق حلول أنظمة المراقبة</h2>
            <p>نقدم حلول مراقبة متكاملة تعتمد على أحدث تقنيات التصوير والتحليل، مع واجهات تشغيل سهلة الاستخدام وإمكانية الإدارة المركزية أو المتابعة عن بُعد عبر منصات آمنة.</p>
          </div>

          <div className="enterprise-services-grid">
            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-camera" aria-hidden="true"></i><h3>أنظمة كاميرات المراقبة</h3></div>
              <p>توريد وتركيب كاميرات <bdi>IP</bdi> و<bdi>Analog</bdi> عالية الجودة، داخلية وخارجية، بدقة تصل إلى <bdi>4K</bdi>، تشمل كاميرات ثابتة ومتحركة وحرارية، وأنظمة قراءة لوحات المركبات، مع إمكانية المراقبة عن بُعد وفق سياسات أمان محكمة.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-hard-drive" aria-hidden="true"></i><h3>أنظمة التسجيل وإدارة الفيديو <bdi>(VMS)</bdi></h3></div>
              <p>بنية تسجيل احترافية باستخدام أجهزة <bdi>NVR</bdi> و<bdi>DVR</bdi> عالية الأداء، مع تخزين آمن وإدارة مركزية تتيح تنظيم التسجيلات واسترجاعها بسرعة، وربط المواقع بغرف تحكم لمتابعة فعالة ومتواصلة.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-eye" aria-hidden="true"></i><h3>التحليل المرئي الذكي</h3></div>
              <p>دمج تقنيات الذكاء الاصطناعي لتحويل نظام المراقبة إلى منصة تحليل استباقي قادرة على كشف الأنشطة غير الطبيعية، وإرسال تنبيهات فورية، ودعم سرعة الاستجابة للحوادث، بما يعزز مستوى الأمان التشغيلي.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-tower-broadcast" aria-hidden="true"></i><h3>حلول الكاميرات المؤقتة</h3></div>
              <p>أنظمة مراقبة مرنة وسريعة التركيب للمشاريع قصيرة المدى مثل مواقع الإنشاءات والفعاليات والمعارض، توفر تغطية أمنية فعالة دون الحاجة إلى بنية تحتية دائمة أو استثمارات طويلة الأجل.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="enterprise-workflow cctv-why" aria-labelledby="cctv-why-title">
        <div className="enterprise-workflow-inner">
          <div className="enterprise-workflow-heading">
            <span>حماية مدروسة وتنفيذ موثوق</span>
            <h2 id="cctv-why-title">لماذا المتقدم لحلول أنظمة المراقبة؟</h2>
          </div>

          <div className="enterprise-workflow-steps" role="list">
            <div className="enterprise-workflow-line" aria-hidden="true"></div>
            <article className="enterprise-workflow-step is-visible" role="listitem">
              <span className="enterprise-workflow-number">01</span>
              <h3>خبرة تقنية متخصصة</h3>
              <p>فريق هندسي وفني يمتلك خبرة عملية في تنفيذ مشاريع الأمن والمراقبة بمختلف أحجامها.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">02</span>
              <h3>التزام بمعايير الجودة</h3>
              <p>تطبيق أفضل الممارسات الهندسية لضمان تنفيذ احترافي ومستدام.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">03</span>
              <h3>نهج يركز على العميل</h3>
              <p>تخصيص إدارة مشروع لكل عقد لضمان متابعة دقيقة وتلبية المتطلبات التشغيلية.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">04</span>
              <h3>حلول قابلة للتوسع</h3>
              <p>تصميم أنظمة يمكن تطويرها مستقبلًا دون الحاجة لإعادة بناء البنية الأساسية.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="contact-cta enterprise-contact-cta" aria-labelledby="cctv-cta-title">
        <div className="contact-cta-copy">
          <h2 id="cctv-cta-title">عزّز أمن منشأتك بمنظومة مراقبة احترافية</h2>
          <p>نساعدك على تصميم نظام مراقبة متكامل يلائم طبيعة نشاطك ويحقق التوازن بين الأمان وسهولة الإدارة، مع جاهزية للتوسع المستقبلي.</p>
        </div>
        <Link className="contact-cta-button" to="/contact">اطلب عرضًا فنيًا وماليًا مخصصًا <span aria-hidden="true">←</span></Link>
      </section>
    </div>
  );
}
