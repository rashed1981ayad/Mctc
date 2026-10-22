import React from "react";
import { Link } from "react-router-dom";
import { useWorkflowReveal } from "../../hooks/useWorkflowReveal.js";
import "../../styles/reference.ar.css";

export default function NetworkInfrastructurePage() {
  useWorkflowReveal();
  return (
<div className="enterprise-main networking-main">
      <section className="enterprise-hero networking-hero" aria-labelledby="networking-hero-title">
        <img src="/site-assets/networking-hero.webp" alt="بنية تحتية احترافية للشبكات ومراكز البيانات" />
        <div className="enterprise-hero-shade"></div>
        <div className="enterprise-hero-content">
          <h1 id="networking-hero-title">نصمم بنية تحتية للشبكات توفر اتصالًا سريعًا ومستقرًا وآمنًا</h1>
          <p>وتدعم تشغيل الأنظمة الرقمية وتوسع الأعمال بثقة واستدامة.</p>
        </div>
      </section>

      <section className="enterprise-introduction networking-introduction" aria-label="مقدمة عن حلول البنية التحتية للشبكات">
        <div className="enterprise-introduction-inner">
          <p className="enterprise-intro-text">تمثل البنية التحتية للشبكات الأساس الذي تعتمد عليه المؤسسات في تشغيل أنظمتها الرقمية وتبادل البيانات بكفاءة وأمان. فالشبكة المصممة بشكل احترافي تضمن اتصالًا مستقرًا وسريعًا بين المستخدمين والأنظمة والتطبيقات، وتدعم نمو الأعمال والتوسع المستقبلي دون تعقيدات تقنية.</p>
          <p className="enterprise-intro-text">توفر <strong>المتقدم</strong> حلول بنية تحتية متكاملة للشبكات تشمل التخطيط والتصميم والتنفيذ والتشغيل، مع استخدام تقنيات موثوقة ومعدات من الشركات العالمية لضمان الأداء العالي والاستقرار التشغيلي.</p>
          <p className="enterprise-intro-text">نصمم كل منظومة وفق احتياجات المؤسسة، مع مراعاة قابلية التوسع والأمان وسهولة الإدارة، بما يضمن بيئة اتصال رقمية تدعم العمليات اليومية وتواكب متطلبات المستقبل.</p>
        </div>
      </section>

      <section className="enterprise-services networking-scope" aria-labelledby="networking-scope-title">
        <div className="enterprise-services-inner">
          <div className="enterprise-services-lead"><h2 id="networking-scope-title">نطاق حلول البنية التحتية للشبكات</h2></div>
          <div className="enterprise-services-grid">
            <article className="enterprise-service-card cloud-service-title"><div className="enterprise-service-title"><i className="fa-solid fa-ethernet" aria-hidden="true"></i><h3>أنظمة الكوابل الهيكلية <small dir="ltr">Structured Cabling (Copper &amp; Fiber Optic)</small></h3></div><p>تصميم وتنفيذ أنظمة الكوابل النحاسية والألياف الضوئية وفق المعايير العالمية، مع تجهيز غرف الشبكات والخزائن وتنظيم البنية التحتية بما يضمن سرعة نقل البيانات وسهولة التشغيل والصيانة.</p></article>
            <article className="enterprise-service-card cloud-service-title"><div className="enterprise-service-title"><i className="fa-solid fa-wifi" aria-hidden="true"></i><h3>تصميم وتنفيذ الشبكات السلكية واللاسلكية <small dir="ltr">LAN, WAN &amp; Wireless Network Solutions</small></h3></div><p>تحليل بيئة العمل وتصميم شبكات LAN وWAN وربط الفروع، وتنفيذ شبكات Wi-Fi عالية الكفاءة مع مسوحات لاسلكية احترافية لضمان التغطية والأداء والاستقرار.</p></article>
            <article className="enterprise-service-card cloud-service-title"><div className="enterprise-service-title"><i className="fa-solid fa-shield-halved" aria-hidden="true"></i><h3>أمن الشبكات والجدران النارية <small dir="ltr">Network Security &amp; Firewall Solutions</small></h3></div><p>تركيب وإدارة الجدران النارية الحديثة، وإدارة سياسات الأمن وحركة البيانات، ومراقبة التهديدات والاستجابة للحوادث لحماية الأصول الرقمية وضمان استمرارية العمل.</p></article>
            <article className="enterprise-service-card cloud-service-title"><div className="enterprise-service-title"><i className="fa-solid fa-user-shield" aria-hidden="true"></i><h3>حلول الربط الآمن والوصول عن بُعد <small dir="ltr">VPN &amp; Remote Access Solutions</small></h3></div><p>إعداد شبكات VPN للفروع والموظفين، وتشفير البيانات أثناء نقلها، وتأمين الاتصال بين المواقع المختلفة لتوفير وصول موثوق وآمن إلى موارد المؤسسة.</p></article>
            <article className="enterprise-service-card cloud-service-title"><div className="enterprise-service-title"><i className="fa-solid fa-chart-line" aria-hidden="true"></i><h3>مراقبة الشبكة وتحسين الأداء <small dir="ltr">Network Monitoring &amp; Performance Optimization</small></h3></div><p>مراقبة أداء الشبكة وتحليل حركة البيانات واكتشاف الاختناقات والأعطال قبل تأثيرها على التشغيل، مع تنبيهات فورية وتحسين مستمر للإعدادات والكفاءة.</p></article>
            <article className="enterprise-service-card cloud-service-title"><div className="enterprise-service-title"><i className="fa-solid fa-phone-volume" aria-hidden="true"></i><h3>أنظمة الاتصال الموحد والهاتف عبر الشبكة <small dir="ltr">IP Telephony &amp; Unified Communications</small></h3></div><p>دمج الاتصالات الصوتية والمرئية ضمن منصة موحدة تشمل VoIP والاتصال الداخلي وربط الفروع، مع التكامل مع تطبيقات العمل لتعزيز الإنتاجية وسهولة التواصل.</p></article>
          </div>
        </div>
      </section>

      <section className="enterprise-workflow managed-it-why networking-why" aria-labelledby="networking-why-title">
        <div className="enterprise-workflow-inner">
          <div className="enterprise-workflow-heading">
            <span>شبكات مستقرة تنمو مع أعمالك</span>
            <h2 id="networking-why-title">لماذا المتقدم في حلول الشبكات؟</h2>
          </div>
          <div className="enterprise-workflow-steps" role="list">
            <div className="enterprise-workflow-line" aria-hidden="true"></div>
            <article className="enterprise-workflow-step is-visible" role="listitem"><span className="enterprise-workflow-number">01</span><h3>تصميم هندسي دقيق</h3><p>نبدأ بتحليل احتياجات الشبكة الحالية وتوقعات النمو المستقبلي لتصميم بنية تحتية متكاملة.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">02</span><h3>حلول قابلة للتوسع</h3><p>نصمم الشبكات بطريقة تسمح بالتوسع مستقبلًا دون الحاجة إلى إعادة بناء البنية الأساسية.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">03</span><h3>تقنيات موثوقة</h3><p>نستخدم معدات وتقنيات من الشركات العالمية لضمان الأداء العالي والاستقرار.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">04</span><h3>تنفيذ احترافي</h3><p>ننفذ الشبكات وفق أفضل الممارسات التقنية والمعايير العالمية.</p></article>
            <article className="enterprise-workflow-step" role="listitem"><span className="enterprise-workflow-number">05</span><h3>دعم فني متخصص</h3><p>نوفر الدعم الفني والمتابعة المستمرة لضمان استقرار الشبكة وتحسين أدائها.</p></article>
          </div>
        </div>
      </section>

      <section className="contact-cta enterprise-contact-cta" aria-labelledby="networking-cta-title">
        <div className="contact-cta-copy">
          <h2 id="networking-cta-title">ارتقِ ببنية الشبكة داخل مؤسستك</h2>
          <p>نساعدك على تصميم بنية شبكة موثوقة وآمنة تدعم جميع أنظمة مؤسستك وتواكب متطلبات النمو المستقبلي. مع <strong>المتقدم</strong> تتحول شبكتك إلى بنية رقمية قوية تدعم أعمالك اليوم وتمنحك الجاهزية التقنية لمتطلبات المستقبل.</p>
        </div>
        <div className="contact-cta-actions">
          <Link className="contact-cta-button" to="/contact">اطلب تقييمًا للبنية التحتية <span aria-hidden="true">←</span></Link>
        </div>
      </section>
    </div>
  );
}
