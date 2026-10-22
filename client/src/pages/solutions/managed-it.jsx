import React from "react";
import { Link } from "react-router-dom";
import { useWorkflowReveal } from "../../hooks/useWorkflowReveal.js";
import "../../styles/reference.ar.css";

export default function ManagedItPage() {
  useWorkflowReveal();
  return (
<div className="enterprise-main managed-it-main">
      <section className="enterprise-hero managed-it-hero" aria-labelledby="managed-it-hero-title">
        <img src="/site-assets/managed-it-hero.webp" alt="مختص تقنية معلومات يراقب الأنظمة الرقمية" />
        <div className="enterprise-hero-shade"></div>
        <div className="enterprise-hero-content">
          <h1 id="managed-it-hero-title">في عالم يعتمد بشكل متزايد على الأنظمة الرقمية</h1>
          <p>تصبح استمرارية البنية التقنية وكفاءتها عنصرًا أساسيًا في نجاح المؤسسات.</p>
        </div>
      </section>

      <section className="enterprise-introduction managed-it-introduction" aria-label="مقدمة عن خدمات تقنية المعلومات المُدارة">
        <div className="enterprise-introduction-inner">
          <p className="enterprise-intro-text">تعتمد المؤسسات الحديثة على بنية تقنية مستقرة وآمنة لضمان استمرارية الأعمال وتحقيق الكفاءة التشغيلية. ومع تزايد تعقيد الأنظمة التقنية وتوسع بيئات العمل الرقمية، أصبحت إدارة البنية التحتية لتقنية المعلومات تتطلب خبرات متخصصة وأدوات مراقبة متقدمة.</p>
          <p className="enterprise-intro-text">نوفر في <strong>المتقدم</strong> خدمات تقنية المعلومات المُدارة التي تساعد المؤسسات على تشغيل وإدارة بيئتها التقنية بكفاءة عالية، من خلال مراقبة الأنظمة بشكل استباقي، وتقديم الدعم الفني المستمر، وضمان استقرار البنية التحتية التقنية.</p>
          <p className="enterprise-intro-text">تم تصميم هذه الخدمات لتمكين المؤسسات من التركيز على أعمالها الأساسية، بينما يتولى فريقنا إدارة وصيانة وتشغيل الأنظمة التقنية بشكل احترافي.</p>
        </div>
      </section>

      <section className="enterprise-services managed-it-scope" aria-labelledby="managed-it-scope-title">
        <div className="enterprise-services-inner">
          <div className="enterprise-services-lead"><h2 id="managed-it-scope-title">عناصر ونطاق الحلول التي تقدمها المتقدم</h2></div>
          <div className="enterprise-services-grid">
            <article className="enterprise-service-card cloud-service-title"><div className="enterprise-service-title"><i className="fa-solid fa-network-wired" aria-hidden="true"></i><h3>إدارة البنية التحتية لتقنية المعلومات <small dir="ltr">IT Infrastructure Management</small></h3></div><p>إدارة شاملة للبنية التحتية التقنية للمؤسسات بما يشمل الخوادم، والشبكات، وأنظمة التخزين، والأجهزة الطرفية، لضمان استقرار الأنظمة وتحسين أدائها.</p></article>
            <article className="enterprise-service-card cloud-service-title"><div className="enterprise-service-title"><i className="fa-solid fa-screwdriver-wrench" aria-hidden="true"></i><h3>إدارة الأنظمة والصيانة الدورية <small dir="ltr">System Administration &amp; Maintenance</small></h3></div><p>إدارة الخوادم والأنظمة التشغيلية والتطبيقات لضمان عملها بكفاءة عالية، مع تنفيذ عمليات الصيانة الدورية والتحسينات التقنية المستمرة.</p></article>
            <article className="enterprise-service-card cloud-service-title"><div className="enterprise-service-title"><i className="fa-solid fa-headset" aria-hidden="true"></i><h3>الدعم الفني عن بُعد وفي الموقع <small dir="ltr">24/7 Remote &amp; On-Site Support</small></h3></div><p>توفير دعم فني مستمر لمعالجة المشكلات التقنية بسرعة وكفاءة، سواء عبر الدعم عن بُعد أو من خلال الزيارات الميدانية عند الحاجة.</p></article>
            <article className="enterprise-service-card cloud-service-title"><div className="enterprise-service-title"><i className="fa-solid fa-chart-line" aria-hidden="true"></i><h3>المراقبة الاستباقية للأنظمة <small dir="ltr">Proactive System Monitoring</small></h3></div><p>استخدام أدوات مراقبة متقدمة لمتابعة أداء الأنظمة والشبكات بشكل مستمر، واكتشاف المشكلات المحتملة قبل تأثيرها على العمليات التشغيلية.</p></article>
            <article className="enterprise-service-card cloud-service-title"><div className="enterprise-service-title"><i className="fa-solid fa-boxes-stacked" aria-hidden="true"></i><h3>إدارة أصول الأجهزة والبرمجيات <small dir="ltr">Hardware &amp; Software Asset Management</small></h3></div><p>إدارة وتتبع الأصول التقنية للمؤسسات بما يشمل الأجهزة والبرمجيات، لضمان الاستخدام الأمثل للموارد التقنية وإدارة دورة حياة الأصول.</p></article>
            <article className="enterprise-service-card cloud-service-title"><div className="enterprise-service-title"><i className="fa-solid fa-arrows-rotate" aria-hidden="true"></i><h3>إدارة التحديثات الأمنية والتقنية <small dir="ltr">Patch Management &amp; Updates</small></h3></div><p>إدارة التحديثات الدورية للأنظمة والتطبيقات لضمان الحماية من الثغرات الأمنية وتحسين الأداء والاستقرار.</p></article>
          </div>
        </div>
      </section>

      <section className="enterprise-workflow managed-it-why" aria-labelledby="managed-it-why-title">
        <div className="enterprise-workflow-inner">
          <div className="enterprise-workflow-heading">
            <span>إدارة استباقية وشراكة تقنية مستمرة</span>
            <h2 id="managed-it-why-title">لماذا المتقدم في خدمات تقنية المعلومات؟</h2>
          </div>
          <div className="enterprise-workflow-steps" role="list">
            <div className="enterprise-workflow-line" aria-hidden="true"></div>
            <article className="enterprise-workflow-step is-visible" role="listitem"><span className="enterprise-workflow-number">01</span><h3>خبرة هندسية في بيئات تقنية معقدة</h3><p>يمتلك فريق المتقدم خبرة عملية في إدارة البنية التحتية لمختلف القطاعات والبيئات التشغيلية الحساسة التي تتطلب استقرارًا عاليًا واستجابة سريعة للأعطال.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">02</span><h3>إدارة استباقية تقلل الأعطال</h3><p>نعتمد على المراقبة والتحليل المستمر للأداء لاكتشاف المشكلات التقنية المحتملة قبل تأثيرها على العمليات التشغيلية.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">03</span><h3>تقليل التكلفة التشغيلية</h3><p>نموذج إدارة فعال يتيح الاستفادة من خبرات متخصصة وأدوات احترافية بتكلفة تشغيلية أقل من بناء فريق تقني داخلي كامل.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">04</span><h3>تكامل كامل مع البنية التقنية</h3><p>ندير الشبكات والخوادم والتطبيقات والأجهزة كمنظومة واحدة مترابطة تضمن استقرار البيئة التقنية.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">05</span><h3>شريك تقني طويل الأمد</h3><p>نعمل مع المؤسسات كشريك تقني يساعد في تطوير البنية الرقمية وتحسين جاهزية الأنظمة لمتطلبات النمو المستقبلية.</p></article>
          </div>
        </div>
      </section>

      <section className="contact-cta enterprise-contact-cta" aria-labelledby="managed-it-cta-title">
        <div className="contact-cta-copy">
          <h2 id="managed-it-cta-title">اترك إدارة التقنية للخبراء</h2>
          <p>نساعدك على إدارة بيئتك التقنية بكفاءة واستقرار، لتتمكن من التركيز على تطوير أعمالك. مع <strong>المتقدم</strong> تتحول إدارة تقنية المعلومات من تحدٍ تشغيلي إلى منظومة مستقرة تدعم نمو أعمالك بثقة واستمرارية.</p>
        </div>
        <Link className="contact-cta-button" to="/contact">اطلب تقييمًا للبنية التقنية لمؤسستك <span aria-hidden="true">←</span></Link>
      </section>
    </div>
  );
}
