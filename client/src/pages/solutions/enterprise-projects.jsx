import React from "react";
import { Link } from "react-router-dom";
import { useWorkflowReveal } from "../../hooks/useWorkflowReveal.js";
import "../../styles/reference.ar.css";

export default function EnterpriseProjectsPage() {
  useWorkflowReveal();
  return (
<div className="enterprise-main">
      <section className="enterprise-hero" aria-labelledby="enterprise-hero-title">
        <img src="/site-assets/enterprise-projects-hero.webp" alt="واجهة معمارية حديثة ترمز إلى حلول المؤسسات والمشاريع الكبرى" />
        <div className="enterprise-hero-shade"></div>
        <div className="enterprise-hero-content">
          <h1 id="enterprise-hero-title">مكّن المؤسسات من بنية تقنية آمنة وعالية الاعتمادية</h1>
          <p>تدعم العمليات الحرجة وتضمن استمرارية الأعمال والتحول الرقمي بثقة.</p>
        </div>
      </section>

      <section className="enterprise-introduction" aria-labelledby="enterprise-audience-title">
        <div className="enterprise-introduction-inner">
          <p className="enterprise-intro-text">تتطلب مشاريع المؤسسات الكبرى والجهات الحكومية بنية تقنية متقدمة قادرة على تحقيق أعلى مستويات الاعتمادية والأمان وقابلية التوسع بما يدعم العمليات الحيوية واستمرارية الأعمال. ومن هذا المنطلق، طوّرت المتقدم حزمة <bdi>Enterprise Projects</bdi> لتلبية متطلبات البيئات المعقدة التي تعتمد على تكامل الأنظمة، وحوكمة واضحة، ومستويات خدمة احترافية تضمن استقرار الأداء على المدى الطويل.</p>

          <div className="enterprise-audience-layout">
            <div className="enterprise-audience-heading">
              <span>الفئات المستفيدة</span>
              <h2 id="enterprise-audience-title">لمن هذه الحلول؟</h2>
            </div>

            <div className="enterprise-audience-grid" role="list">
              <article className="enterprise-audience-card" role="listitem"><span>الجهات والمؤسسات الحكومية</span></article>
              <article className="enterprise-audience-card" role="listitem"><span>الشركات الكبرى</span></article>
              <article className="enterprise-audience-card" role="listitem"><span>البنوك والمؤسسات المالية</span></article>
              <article className="enterprise-audience-card" role="listitem"><span>شركات النفط والغاز والطاقة</span></article>
              <article className="enterprise-audience-card" role="listitem"><span>الجامعات والمؤسسات التعليمية الكبرى</span></article>
              <article className="enterprise-audience-card" role="listitem"><span>المستشفيات والمجمعات الطبية</span></article>
              <article className="enterprise-audience-card" role="listitem"><span>المنظمات الدولية والمؤسسات ذات الفروع المتعددة</span></article>
            </div>
          </div>
        </div>
      </section>

      <section className="enterprise-services" aria-labelledby="enterprise-services-title">
        <div className="enterprise-services-inner">
          <div className="enterprise-services-lead">
            <h2 id="enterprise-services-title">أنظمة وحلول لمشاريع <bdi>Enterprise</bdi></h2>
            <p>تعتمد خدماتنا على منهجية متكاملة تشمل التخطيط الاستراتيجي والتصميم الهندسي والتنفيذ والتشغيل، مع توفير دعم تقني مستمر طويل المدى، بما يتوافق مع أفضل المعايير العالمية ويضمن تكامل الأنظمة واستمرارية الأداء المؤسسي بكفاءة وموثوقية.</p>
          </div>

          <figure className="enterprise-services-visual">
            <img src="/site-assets/enterprise-services-diagram-v2.webp" alt="مخطط توضيحي يربط البنية التقنية للمؤسسة بالفروع والعاملين عن بعد والحلول السحابية" loading="lazy" />
          </figure>

          <div className="enterprise-services-grid">
            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-server" aria-hidden="true"></i><h3>البنية التحتية لتقنية المعلومات</h3></div>
              <p>نقوم بتصميم وتنفيذ بنية تقنية مؤسسية متكاملة تشمل الخوادم الافتراضية، والحوسبة السحابية الخاصة أو الهجينة، وأنظمة النسخ الاحتياطي والتعافي من الكوارث لضمان استمرارية البيانات والخدمات الحيوية، إضافة إلى إدارة الهوية والصلاحيات بما يعزز التحكم الآمن في الوصول إلى الأنظمة.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-network-wired" aria-hidden="true"></i><h3>البنية التحتية الشبكية المتقدمة</h3></div>
              <p>نصمم شبكات مؤسسية متطورة تغطي بيئات <bdi>LAN</bdi> و<bdi>WAN</bdi> و<bdi>MAN</bdi>، مع شبكات لاسلكية عالية الكثافة وربط آمن بين الفروع باستخدام تقنيات <bdi>VPN</bdi>، إلى جانب أنظمة مراقبة الأداء الشبكي والجدران النارية المتقدمة لضمان اتصال مستقر وآمن عبر جميع مواقع المؤسسة.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-database" aria-hidden="true"></i><h3>مراكز البيانات</h3></div>
              <p>نقدّم حلول تصميم وبناء وتطوير مراكز البيانات وفق معايير الجاهزية العالية، تشمل أنظمة الطاقة والتبريد، والتكرار والاستمرارية التشغيلية، وتوسعة أو ترحيل مراكز البيانات، مع أنظمة مراقبة وإدارة مركزية تمنح رؤية كاملة لأداء البنية التحتية.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-shield-halved" aria-hidden="true"></i><h3>أنظمة الأمن والسلامة المتكاملة</h3></div>
              <p>نوفّر منظومات أمن وسلامة مترابطة تشمل أنظمة المراقبة الذكية، والتحكم المتقدم بالدخول، وأنظمة إنذار وكشف الحريق، وأنظمة الإخلاء الصوتي، مع تكامل كامل بين الأنظمة الأمنية والمنصات المركزية لتعزيز الاستجابة السريعة وإدارة المخاطر بكفاءة.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-tower-broadcast" aria-hidden="true"></i><h3>الأنظمة الصوتية والمرئية والاتصالات</h3></div>
              <p>نجهّز حلول اتصالات مؤسسية متقدمة تشمل أنظمة المؤتمرات الاحترافية، والصوت العام وأنظمة الإخلاء، وحلول الاتصال الموحد التي تدمج الصوت والبيانات والتواصل الداخلي ضمن بيئة تشغيل متكاملة تدعم العمل التعاوني الحديث.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-user-shield" aria-hidden="true"></i><h3>الأمن السيبراني</h3></div>
              <p>نطبّق استراتيجيات أمن سيبراني شاملة تبدأ بتقييم المخاطر والجاهزية الأمنية، مرورًا بحماية الشبكات ونقاط النهاية وأنظمة كشف ومنع الاختراق، وصولًا إلى إعداد سياسات الامتثال وأمن المعلومات بما يضمن حماية مستدامة للأنظمة والبيانات الحساسة.</p>
            </article>

            <article className="enterprise-service-card enterprise-service-card-wide">
              <div className="enterprise-service-title"><i className="fa-solid fa-headset" aria-hidden="true"></i><h3>الخدمات التقنية على مدار الساعة</h3></div>
              <p>نوفّر تشغيلًا وإدارة مستمرة للبنية التحتية عبر مراقبة استباقية ودعم فني على مدار الساعة وفق اتفاقيات مستوى خدمة واضحة <bdi>(SLA)</bdi>، مع إدارة التحديثات والرقع الأمنية لضمان استقرار الأنظمة وتقليل المخاطر التشغيلية.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="enterprise-workflow" aria-labelledby="enterprise-workflow-title">
        <div className="enterprise-workflow-inner">
          <div className="enterprise-workflow-heading">
            <span>خطوات مدروسة، نتائج موثوقة</span>
            <h2 id="enterprise-workflow-title">منهجية العمل</h2>
            <p>نطبّق في مشاريع <bdi>Enterprise</bdi> منهجية تنفيذ احترافية تضمن وضوح المراحل وتحقيق النتائج بكفاءة.</p>
          </div>

          <div className="enterprise-workflow-steps" role="list">
            <div className="enterprise-workflow-line" aria-hidden="true"></div>
            <article className="enterprise-workflow-step is-visible" role="listitem">
              <span className="enterprise-workflow-number">01</span>
              <h3>تحليل الاحتياجات</h3>
              <p>دراسة البيئة التشغيلية والمتطلبات التقنية والحوكمة المؤسسية.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">02</span>
              <h3>التصميم الاستراتيجي</h3>
              <p>إعداد تصميم تقني متكامل يوازن بين الأداء والأمان وقابلية التوسع.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">03</span>
              <h3>التنفيذ والتركيب</h3>
              <p>تنفيذ المشروع وفق معايير هندسية دقيقة مع إدارة مراحل التنفيذ.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">04</span>
              <h3>الاختبار والتشغيل</h3>
              <p>اختبار شامل للأنظمة وتسليمها جاهزة للعمل دون التأثير على العمليات.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">05</span>
              <h3>الدعم طويل المدى</h3>
              <p>تشغيل ومتابعة مستمرة لضمان الاستقرار وتحسين الأداء.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="contact-cta enterprise-contact-cta" aria-labelledby="enterprise-cta-title">
        <div className="contact-cta-copy">
          <h2 id="enterprise-cta-title">هل تسعى لبناء بنية تقنية مؤسسية عالية الاعتمادية؟</h2>
          <p>نحلّل متطلبات مؤسستك بدقة لتحديد نطاق الحل الأمثل، ونقدّم تصورًا هندسيًا واضحًا يضمن تكامل الأنظمة واستمرارية التشغيل، مع تصميم قابل للتوسع مستقبلاً دون الحاجة لإعادة بناء البنية التقنية أو تعطيل العمليات.</p>
        </div>
        <Link className="contact-cta-button" to="/contact">اطلب تقييمًا سريعًا لاحتياج مكتبك <span aria-hidden="true">←</span></Link>
      </section>
    </div>
  );
}
