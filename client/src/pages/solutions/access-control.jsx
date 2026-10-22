import React from "react";
import { Link } from "react-router-dom";
import { useWorkflowReveal } from "../../hooks/useWorkflowReveal.js";
import "../../styles/reference.ar.css";

export default function AccessControlPage() {
  useWorkflowReveal();
  return (
<div className="enterprise-main access-control-main">
      <section className="enterprise-hero access-control-hero" aria-labelledby="access-control-hero-title">
        <img src="/site-assets/access-control-hero.webp" alt="نظام إلكتروني ذكي للتحكم في الدخول وإدارة هويات المستخدمين" />
        <div className="enterprise-hero-shade"></div>
        <div className="enterprise-hero-content">
          <h1 id="access-control-hero-title">إدارة ذكية وآمنة لعمليات الدخول والصلاحيات</h1>
          <p>تتيح التحكم الدقيق في الوصول إلى المرافق والمناطق الحساسة ضمن منظومة مركزية تعزز التنظيم وترفع مستوى الأمان التشغيلي داخل المنشآت.</p>
        </div>
      </section>

      <section className="enterprise-introduction access-control-introduction" aria-label="مقدمة عن أنظمة التحكم بالدخول وإدارة الهوية">
        <div className="enterprise-introduction-inner">
          <p className="enterprise-intro-text">تمثل أنظمة التحكم بالدخول وإدارة الهوية أحد أهم عناصر الأمن الحديث في المباني والمنشآت، حيث تتيح إدارة الوصول إلى المرافق والمناطق الحساسة بشكل ذكي ومنظم. تعتمد هذه الأنظمة على تقنيات تحقق إلكترونية متقدمة تسمح بمنح الصلاحيات المناسبة لكل مستخدم، مما يضمن دخول الأشخاص المخولين فقط إلى المناطق المحددة.</p>
          <p className="enterprise-intro-text">نركز في المتقدم على تحويل عملية الدخول التقليدية إلى منظومة رقمية متكاملة يمكن إدارتها ومراقبتها مركزيًا، مع تسجيل جميع العمليات وتوفير تقارير دقيقة تعزز مستوى الأمن والتنظيم داخل المنشأة.</p>
        </div>
      </section>

      <section className="enterprise-services access-control-scope" aria-labelledby="access-control-scope-title">
        <div className="enterprise-services-inner">
          <div className="enterprise-services-lead">
            <h2 id="access-control-scope-title">نطاق حلول أنظمة التحكم بالدخول</h2>
          </div>

          <div className="enterprise-services-grid">
            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-door-open" aria-hidden="true"></i><h3>أنظمة التحكم بالدخول</h3></div>
              <p>تصميم وتنفيذ أنظمة تحكم تعتمد على وحدات تحكم مركزية وقارئات ذكية لإدارة جميع نقاط الدخول داخل المبنى، مع إمكانية تحديد الصلاحيات حسب المستخدم أو الموقع أو الوقت.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-lock" aria-hidden="true"></i><h3>الأقفال الإلكترونية الذكية</h3></div>
              <p>توريد وتركيب أقفال إلكترونية تعتمد على البطاقات الذكية أو الأرقام السرية أو البصمة أو التعرف على الوجه، لتوفير مستويات أمان أعلى وإلغاء الاعتماد على المفاتيح التقليدية.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-id-card" aria-hidden="true"></i><h3>إدارة الهوية والصلاحيات</h3></div>
              <p>إنشاء نظام متكامل لإدارة هويات المستخدمين وصلاحياتهم داخل المنشأة، يحدد من يمكنه الدخول إلى أي منطقة وفي أي وقت، مع إمكانية تعديل الصلاحيات بسهولة حسب المتغيرات التشغيلية.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-clipboard-list" aria-hidden="true"></i><h3>تسجيل ومراقبة عمليات الدخول</h3></div>
              <p>توفر الأنظمة سجلًا كاملًا لجميع عمليات الدخول والخروج، مما يسمح بمراقبة الحركة داخل المنشأة وإصدار تقارير تفصيلية تدعم إدارة الأمن والموارد البشرية.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-shield-halved" aria-hidden="true"></i><h3>التكامل مع الأنظمة الأمنية الأخرى</h3></div>
              <p>إمكانية دمج أنظمة التحكم بالدخول مع كاميرات المراقبة، وإنذار الحريق، وأنظمة إدارة المباني لإنشاء منظومة أمنية مترابطة تعمل بكفاءة أعلى.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-laptop" aria-hidden="true"></i><h3>الإدارة المركزية والتحكم عن بُعد</h3></div>
              <p>منصة إدارة مركزية تسمح بالتحكم بجميع نقاط الدخول من موقع واحد، مع إمكانية الوصول الآمن عن بُعد وإدارة المستخدمين والصلاحيات بسهولة.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="enterprise-workflow access-control-why" aria-labelledby="access-control-why-title">
        <div className="enterprise-workflow-inner">
          <div className="enterprise-workflow-heading">
            <span>خبرة هندسية وتنفيذ موثوق</span>
            <h2 id="access-control-why-title">لماذا المتقدم في حلول أنظمة التحكم بالدخول والهوية؟</h2>
          </div>

          <div className="enterprise-workflow-steps" role="list">
            <div className="enterprise-workflow-line" aria-hidden="true"></div>
            <article className="enterprise-workflow-step is-visible" role="listitem">
              <span className="enterprise-workflow-number">01</span>
              <h3>تصميم هندسي مخصص</h3>
              <p>نبدأ بدراسة الموقع وتحليل المخاطر الأمنية لتصميم نظام تحكم بالدخول يتناسب مع طبيعة المنشأة واحتياجاتها التشغيلية.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">02</span>
              <h3>حلول قابلة للتوسع</h3>
              <p>تصميم الأنظمة بطريقة تسمح بتوسعتها مستقبلًا دون الحاجة لإعادة بناء البنية الأساسية.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">03</span>
              <h3>تكامل مع الأنظمة الأخرى</h3>
              <p>قدرة عالية على دمج النظام مع أنظمة المراقبة والأمن وأنظمة إدارة المباني.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">04</span>
              <h3>تنفيذ احترافي</h3>
              <p>تنفيذ الأنظمة وفق أفضل الممارسات الفنية ومعايير الجودة لضمان الاستقرار التشغيلي.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">05</span>
              <h3>دعم فني مستمر</h3>
              <p>توفير التدريب والدعم الفني لضمان الاستفادة الكاملة من النظام.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="contact-cta enterprise-contact-cta" aria-labelledby="access-control-cta-title">
        <div className="contact-cta-copy">
          <h2 id="access-control-cta-title">عزّز أمن منشأتك عبر نظام تحكم دخول ذكي</h2>
          <p>نساعدك على تصميم منظومة إدارة وصول متكاملة تحقق التوازن بين الأمان وسهولة الإدارة، مع قابلية التطوير مستقبلًا. مع المتقدم، يصبح الوصول إلى منشأتك أكثر ذكاءً وأمانًا، وتتحول إدارة الدخول إلى منظومة رقمية متكاملة تدعم استقرار أعمالك.</p>
        </div>
        <Link className="contact-cta-button" to="/contact">اطلب تقييمًا لنظام التحكم بالدخول <span aria-hidden="true">←</span></Link>
      </section>
    </div>
  );
}
