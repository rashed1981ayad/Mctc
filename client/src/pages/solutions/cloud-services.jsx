import React from "react";
import { Link } from "react-router-dom";
import { useWorkflowReveal } from "../../hooks/useWorkflowReveal.js";
import "../../styles/reference.ar.css";

export default function CloudServicesPage() {
  useWorkflowReveal();
  return (
<div className="enterprise-main cloud-services-main">
      <section className="enterprise-hero cloud-services-hero" aria-labelledby="cloud-services-hero-title">
        <img src="/site-assets/cloud-services-hero.webp" alt="حلول حوسبة سحابية مرنة وآمنة للمؤسسات" />
        <div className="enterprise-hero-shade"></div>
        <div className="enterprise-hero-content">
          <h1 id="cloud-services-hero-title">نقدم حلول حوسبة سحابية مرنة وآمنة</h1>
          <p>تمكّن المؤسسات من تشغيل أنظمتها وتطبيقاتها بكفاءة عالية، مع تقليل تكاليف البنية التحتية وتعزيز جاهزية الأعمال للنمو المستقبلي.</p>
        </div>
      </section>

      <section className="enterprise-introduction cloud-services-introduction" aria-label="مقدمة عن الخدمات السحابية">
        <div className="enterprise-introduction-inner">
          <p className="enterprise-intro-text">تمثل الخدمات السحابية اليوم أحد أهم ركائز البنية التقنية الحديثة للمؤسسات، حيث تتيح تشغيل الأنظمة والتطبيقات وإدارة البيانات عبر بيئات سحابية مرنة وآمنة بدلًا من الاعتماد الكامل على البنية التحتية المحلية التقليدية.</p>
          <p className="enterprise-intro-text">في <strong>المتقدم</strong>، نوفر حلولًا سحابية متكاملة تساعد المؤسسات على تحسين الكفاءة التشغيلية وتقليل تكاليف البنية التحتية التقنية، مع تعزيز مرونة الأنظمة واستمرارية الأعمال. نقوم بتصميم وتنفيذ بيئات سحابية مخصصة تتوافق مع احتياجات كل مؤسسة، مع التركيز على الأداء العالي، والأمان، وسهولة الإدارة.</p>
        </div>
      </section>

      <section className="enterprise-services cloud-services-scope" aria-labelledby="cloud-services-scope-title">
        <div className="enterprise-services-inner">
          <div className="enterprise-services-lead">
            <h2 id="cloud-services-scope-title">نطاق حلول الخدمات السحابية</h2>
          </div>

          <div className="enterprise-services-grid">
            <article className="enterprise-service-card">
              <div className="enterprise-service-title cloud-service-title"><i className="fa-solid fa-cloud" aria-hidden="true"></i><h3><bdi>Cloud Infrastructure Deployment</bdi><small>تنفيذ البنية التحتية السحابية</small></h3></div>
              <p>تصميم وتنفيذ بيئات سحابية تعتمد على خوادم افتراضية وشبكات سحابية وأنظمة تخزين متقدمة، مما يسمح بتشغيل الأنظمة والتطبيقات بكفاءة دون الحاجة إلى استثمارات كبيرة في الأجهزة المحلية.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title cloud-service-title"><i className="fa-solid fa-arrow-right-arrow-left" aria-hidden="true"></i><h3><bdi>Cloud Migration Services</bdi><small>نقل الأنظمة إلى البيئة السحابية</small></h3></div>
              <p>مساعدة المؤسسات على نقل الخوادم والأنظمة والتطبيقات من البنية التقليدية إلى البيئة السحابية بطريقة منظمة وآمنة، مع تقليل وقت التوقف وضمان استمرارية العمليات.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title cloud-service-title"><i className="fa-solid fa-database" aria-hidden="true"></i><h3><bdi>Cloud Backup &amp; Disaster Recovery</bdi><small>النسخ الاحتياطي السحابي واستعادة الكوارث</small></h3></div>
              <p>توفير حلول نسخ احتياطي سحابية لحماية البيانات والأنظمة الحيوية، مع تصميم خطط استعادة الكوارث لضمان إمكانية استرجاع الأنظمة بسرعة في حال حدوث أي طارئ.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title cloud-service-title"><i className="fa-solid fa-cloud-arrow-up" aria-hidden="true"></i><h3><bdi>Hybrid Cloud Solutions</bdi><small>الحلول السحابية الهجينة</small></h3></div>
              <p>تصميم بيئات تقنية تجمع بين البنية التحتية المحلية والسحابة العامة أو الخاصة، مما يمنح المؤسسات مرونة أكبر في إدارة البيانات والتطبيقات.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title cloud-service-title"><i className="fa-solid fa-chart-line" aria-hidden="true"></i><h3><bdi>Cloud Monitoring &amp; Management</bdi><small>مراقبة وإدارة الأنظمة السحابية</small></h3></div>
              <p>إدارة ومراقبة مستمرة للبيئات السحابية لضمان الأداء المستقر وتحسين استخدام الموارد واكتشاف الأعطال قبل تأثيرها على العمليات.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="enterprise-workflow cloud-services-why" aria-labelledby="cloud-services-why-title">
        <div className="enterprise-workflow-inner">
          <div className="enterprise-workflow-heading">
            <span>مرونة أعلى وإدارة أكثر كفاءة</span>
            <h2 id="cloud-services-why-title">لماذا المتقدم في الحلول السحابية؟</h2>
          </div>

          <div className="enterprise-workflow-steps" role="list">
            <div className="enterprise-workflow-line" aria-hidden="true"></div>
            <article className="enterprise-workflow-step is-visible" role="listitem">
              <span className="enterprise-workflow-number">01</span>
              <h3>تصميم سحابي مخصص لبيئة العمل</h3>
              <p>نقوم بدراسة البنية التقنية الحالية للمؤسسة وتصميم بيئة سحابية تناسب طبيعة العمل ومتطلبات الأداء.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">02</span>
              <h3>خبرة في تكامل الأنظمة التقنية</h3>
              <p>نمتلك خبرة في دمج الحلول السحابية مع الشبكات والبنية التحتية والأنظمة المؤسسية الموجودة داخل المؤسسة.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">03</span>
              <h3>تركيز على الأمان واستمرارية الأعمال</h3>
              <p>تصميم حلول سحابية تضمن حماية البيانات وتقليل المخاطر التشغيلية.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">04</span>
              <h3>إدارة احترافية للبيئات السحابية</h3>
              <p>توفير خدمات مراقبة وإدارة مستمرة لضمان استقرار الأنظمة وتحسين الأداء.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="contact-cta enterprise-contact-cta" aria-labelledby="cloud-services-cta-title">
        <div className="contact-cta-copy">
          <h2 id="cloud-services-cta-title">انقل بنيتك التقنية إلى السحابة بثقة</h2>
          <p>نساعدك على تصميم بيئة سحابية آمنة ومرنة تدعم نمو أعمالك وتمنحك القدرة على إدارة أنظمتك بكفاءة. مع <strong>المتقدم</strong>، تتحول السحابة إلى منصة تقنية موثوقة تدعم أعمالك وتمنحك المرونة اللازمة للنمو في عالم رقمي متسارع.</p>
        </div>
        <Link className="contact-cta-button" to="/contact">اطلب استشارة تقنية <span aria-hidden="true">←</span></Link>
      </section>
    </div>
  );
}
