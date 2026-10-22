import React from "react";
import { Link } from "react-router-dom";
import { useWorkflowReveal } from "../../hooks/useWorkflowReveal.js";
import "../../styles/reference.ar.css";

export default function CyberSecurityPage() {
  useWorkflowReveal();
  return (
<div className="enterprise-main cyber-security-main">
      <section className="enterprise-hero cyber-security-hero" aria-labelledby="cyber-security-hero-title">
        <img src="/site-assets/cyber-security-hero.webp" alt="واجهة رقمية ترمز إلى حماية الأنظمة والأعمال من المخاطر السيبرانية" />
        <div className="enterprise-hero-shade"></div>
        <div className="enterprise-hero-content">
          <h1 id="cyber-security-hero-title">نحمي أعمالك عبر حلول أمن سيبراني متكاملة</h1>
          <p>تقلل المخاطر الرقمية وتضمن استمرارية العمليات بثقة في بيئة تقنية متغيرة باستمرار.</p>
        </div>
      </section>

      <section className="enterprise-introduction cyber-security-introduction" aria-label="مقدمة عن الأمن السيبراني">
        <div className="enterprise-introduction-inner">
          <p className="enterprise-intro-text">مع تسارع التحول الرقمي واعتماد المؤسسات على الأنظمة المتصلة والخدمات السحابية، لم يعد الأمن السيبراني خيارًا إضافيًا، بل أصبح عنصرًا أساسيًا لضمان استمرارية الأعمال وحماية البيانات والعمليات التشغيلية.</p>
          <p className="enterprise-intro-text">لدى <strong>المتقدم</strong> حلول أمن سيبراني متكاملة مصممة لحماية المؤسسات من التهديدات الحديثة، مع الحفاظ على كفاءة التشغيل ودعم النمو الرقمي بثقة واستقرار.</p>
          <p className="enterprise-intro-text">نحن لا ننظر إلى الأمن السيبراني كمنتج تقني منفصل، بل كاستراتيجية متكاملة تهدف إلى تقليل المخاطر وتعزيز موثوقية الأعمال ضمن بيئة رقمية متغيرة باستمرار.</p>
        </div>
      </section>

      <section className="enterprise-services cyber-security-scope" aria-labelledby="cyber-security-scope-title">
        <div className="enterprise-services-inner">
          <div className="enterprise-services-lead">
            <h2 id="cyber-security-scope-title">منظومة الحماية المتكاملة</h2>
            <p>نعتمد في المتقدم على نموذج أمني شامل يجمع بين الإنسان والعمليات والتقنية لضمان حماية متوازنة ومستدامة.</p>
          </div>
          <div className="enterprise-services-grid">
            <article className="enterprise-service-card"><div className="enterprise-service-title"><i className="fa-solid fa-users" aria-hidden="true"></i><h3>الأشخاص <bdi>(People)</bdi></h3></div><p>يبدأ الأمن السيبراني من المستخدمين أنفسهم. لذلك نساعد المؤسسات على رفع مستوى الوعي الأمني وتطبيق أفضل ممارسات حماية البيانات، مما يقلل من الأخطاء البشرية التي تُعد أحد أبرز أسباب الاختراقات.</p></article>
            <article className="enterprise-service-card"><div className="enterprise-service-title"><i className="fa-solid fa-list-check" aria-hidden="true"></i><h3>العمليات <bdi>(Processes)</bdi></h3></div><p>نقوم ببناء إجراءات واضحة لإدارة المخاطر والاستجابة للحوادث السيبرانية، بدءًا من اكتشاف التهديدات وتحليلها، وصولًا إلى التعافي السريع واستعادة العمليات دون تأثير كبير على سير العمل.</p></article>
            <article className="enterprise-service-card"><div className="enterprise-service-title"><i className="fa-solid fa-shield-halved" aria-hidden="true"></i><h3>التقنية <bdi>(Technology)</bdi></h3></div><p>نوفر منظومة تقنيات أمنية متقدمة تشمل الجدران النارية المتقدمة، وأنظمة كشف ومنع الاختراق، وحماية البريد الإلكتروني ونقاط النهاية، إضافة إلى تأمين الشبكات والبيئات السحابية، مع تطبيق حلول متقدمة لكشف التهديدات والاستجابة لها لضمان حماية الأنظمة واستمرارية الأعمال بكفاءة عالية.</p></article>
          </div>
        </div>
      </section>

      <section className="enterprise-workflow cyber-security-why" aria-labelledby="cyber-security-why-title">
        <div className="enterprise-workflow-inner">
          <div className="enterprise-workflow-heading">
            <span>حماية أوضح ورؤية تشغيلية متكاملة</span>
            <h2 id="cyber-security-why-title">ما الذي يميز المتقدم في الأمن السيبراني؟</h2>
          </div>

          <div className="enterprise-workflow-steps" role="list">
            <div className="enterprise-workflow-line" aria-hidden="true"></div>
            <article className="enterprise-workflow-step is-visible" role="listitem">
              <span className="enterprise-workflow-number">01</span>
              <h3>نتحدث بلغتك</h3>
              <p>نحوّل المفاهيم التقنية المعقدة إلى حلول واضحة تساعد صناع القرار على فهم المخاطر واتخاذ قرارات مدروسة بثقة.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">02</span>
              <h3>منهج عملي واضح</h3>
              <p>نطبق خطوات تنفيذية مدروسة للوصول إلى بيئة رقمية أكثر أمانًا دون تعقيد تقني أو تأثير على سير العمل.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">03</span>
              <h3>نفكر مع العميل</h3>
              <p>ننطلق من أهداف عملك وليس من التكنولوجيا فقط، لنصمم حلولًا أمنية تدعم النمو وتقلل المخاطر التشغيلية.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">04</span>
              <h3>خبرة قطاعية</h3>
              <p>نمتلك فهمًا عميقًا لاحتياجات القطاعات المختلفة، مما يمكننا من تقديم حلول أمنية ملائمة لكل بيئة عمل.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="contact-cta enterprise-contact-cta" aria-labelledby="cyber-security-cta-title">
        <div className="contact-cta-copy">
          <h2 id="cyber-security-cta-title">ابدأ رحلتك نحو بيئة رقمية أكثر أمانًا</h2>
          <p><strong>المتقدم، شريكك نحو بيئة رقمية آمنة.</strong> من خلال استراتيجية أمن سيبراني متكاملة تجمع بين الخبرة التقنية والرؤية التشغيلية، تساعد شركة المتقدم لتقنية المعلومات المؤسسات على حماية أعمالها، وتعزيز مرونتها الرقمية، ومواكبة التطور التقني بثقة وأمان.</p>
        </div>
        <Link className="contact-cta-button" to="/contact">اطلب تقييمًا أوليًا للجاهزية الأمنية <span aria-hidden="true">←</span></Link>
      </section>
    </div>
  );
}
