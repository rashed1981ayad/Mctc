import React from "react";
import { Link } from "react-router-dom";
import { useWorkflowReveal } from "../../hooks/useWorkflowReveal.js";
import "../../styles/reference.ar.css";

export default function FireAlarmPage() {
  useWorkflowReveal();
  return (
<div className="enterprise-main fire-alarm-main">
      <section className="enterprise-hero fire-alarm-hero" aria-labelledby="fire-alarm-hero-title">
        <img src="/site-assets/fire-alarm-hero.webp" alt="تفعيل نقطة إنذار حريق أثناء استجابة فريق الطوارئ" />
        <div className="enterprise-hero-shade"></div>
        <div className="enterprise-hero-content">
          <h1 id="fire-alarm-hero-title">حماية استباقية تعزز سلامة الأرواح والممتلكات</h1>
          <p>عبر أنظمة ذكية تكتشف المخاطر مبكرًا وتضمن استجابة سريعة للطوارئ داخل المنشآت.</p>
        </div>
      </section>

      <section className="enterprise-introduction fire-alarm-introduction" aria-label="مقدمة عن أنظمة إنذار وكشف الحريق">
        <div className="enterprise-introduction-inner">
          <p className="enterprise-intro-text">تُعد أنظمة إنذار وكشف الحريق عنصرًا أساسيًا في منظومة السلامة داخل المباني والمنشآت، إذ تمثل خط الدفاع الأول لحماية الأرواح والممتلكات. وتعتمد هذه الأنظمة على تقنيات متطورة قادرة على اكتشاف مؤشرات الخطر في مراحل مبكرة، مثل الدخان أو ارتفاع الحرارة أو اللهب، مما يتيح اتخاذ الإجراءات اللازمة بسرعة قبل انتشار الحريق.</p>
          <p className="enterprise-intro-text">تقدم شركة <strong>المتقدم</strong> حلولًا متكاملة في مجال أنظمة الإنذار والكشف عن الحريق، مصممة وفق المعايير الدولية ومتطلبات السلامة الحديثة، بهدف توفير بيئة آمنة للمؤسسات والمنشآت الحيوية.</p>
        </div>
      </section>

      <section className="enterprise-services fire-alarm-scope" aria-labelledby="fire-alarm-scope-title">
        <div className="enterprise-services-inner">
          <div className="enterprise-services-lead"><h2 id="fire-alarm-scope-title">نطاق حلول أنظمة إنذار وكشف الحريق</h2></div>
          <div className="enterprise-services-grid">
            <article className="enterprise-service-card"><div className="enterprise-service-title"><i className="fa-solid fa-fire-extinguisher" aria-hidden="true"></i><h3>أنظمة إنذار الحريق <bdi>Conventional وAddressable</bdi></h3></div><p>تصميم وتنفيذ أنظمة إنذار الحريق المختلفة وفق طبيعة المبنى وحجمه، حيث تسمح الأنظمة المعنونة بتحديد موقع الحريق بدقة داخل المنشأة لتسريع الاستجابة للطوارئ.</p></article>
            <article className="enterprise-service-card"><div className="enterprise-service-title"><i className="fa-solid fa-smog" aria-hidden="true"></i><h3>أنظمة كشف الدخان والحرارة</h3></div><p>توريد وتركيب كواشف دخان وحرارة عالية الحساسية مصممة للكشف المبكر عن أي مؤشرات للحريق، مما يساعد على الحد من المخاطر قبل تطور الحريق.</p></article>
            <article className="enterprise-service-card"><div className="enterprise-service-title"><i className="fa-solid fa-magnifying-glass-chart" aria-hidden="true"></i><h3>أنظمة الكشف المبكر المتقدمة</h3></div><p>في المواقع الحساسة أو عالية الخطورة، يمكن استخدام أنظمة كشف متقدمة قادرة على اكتشاف الدخان أو الحرارة في مراحل مبكرة جدًا، مما يمنح فرق السلامة وقتًا إضافيًا للتدخل.</p></article>
            <article className="enterprise-service-card"><div className="enterprise-service-title"><i className="fa-solid fa-bullhorn" aria-hidden="true"></i><h3>أنظمة الإخلاء الصوتي والإنذار العام</h3></div><p>أنظمة إنذار صوتي توجه تعليمات واضحة للأشخاص داخل المبنى أثناء الطوارئ، مما يساعد على تنظيم عملية الإخلاء وتقليل الفوضى.</p></article>
            <article className="enterprise-service-card"><div className="enterprise-service-title"><i className="fa-solid fa-display" aria-hidden="true"></i><h3>أنظمة المراقبة والتنبيه</h3></div><p>لوحات تحكم مركزية تتيح مراقبة النظام بشكل مستمر وإصدار تنبيهات فورية في حال حدوث إنذار أو خلل لضمان سرعة الاستجابة للحالات الطارئة.</p></article>
          </div>
        </div>
      </section>

      <section className="enterprise-workflow fire-alarm-why" aria-labelledby="fire-alarm-why-title">
        <div className="enterprise-workflow-inner">
          <div className="enterprise-workflow-heading">
            <span>سلامة مصممة وفق متطلبات منشأتك</span>
            <h2 id="fire-alarm-why-title">لماذا المتقدم في حلول إنذار الحريق؟</h2>
          </div>
          <div className="enterprise-workflow-steps" role="list">
            <div className="enterprise-workflow-line" aria-hidden="true"></div>
            <article className="enterprise-workflow-step is-visible" role="listitem"><span className="enterprise-workflow-number">01</span><h3>تصميم هندسي دقيق</h3><p>نبدأ بتحليل المخاطر ومتطلبات السلامة لكل موقع لتصميم نظام يتوافق مع المعايير الدولية وأنظمة الدفاع المدني.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">02</span><h3>تقنيات موثوقة</h3><p>استخدام معدات عالية الجودة تضمن دقة الكشف وسرعة الاستجابة للحالات الطارئة.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">03</span><h3>تنفيذ احترافي</h3><p>تنفيذ الأنظمة وفق أفضل الممارسات الفنية لضمان استقرار النظام وموثوقيته على المدى الطويل.</p></article>
          </div>
        </div>
      </section>

      <section className="contact-cta enterprise-contact-cta" aria-labelledby="fire-alarm-cta-title">
        <div className="contact-cta-copy">
          <h2 id="fire-alarm-cta-title">عزّز سلامة منشأتك عبر نظام إنذار حريق موثوق</h2>
          <p>نساعدك على تصميم نظام إنذار وكشف حريق متكامل يحقق أعلى مستويات الحماية ويضمن استجابة سريعة للحالات الطارئة. مع المتقدم، تصبح السلامة جزءًا من البنية الذكية لمبناك، وحماية الأرواح والممتلكات أولوية لا تقبل المساومة.</p>
        </div>
        <Link className="contact-cta-button" to="/contact">اطلب تقييمًا لنظام السلامة في منشأتك <span aria-hidden="true">←</span></Link>
      </section>
    </div>
  );
}
