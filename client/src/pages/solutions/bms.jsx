import React from "react";
import { Link } from "react-router-dom";
import { useWorkflowReveal } from "../../hooks/useWorkflowReveal.js";
import "../../styles/reference.ar.css";

export default function BmsPage() {
  useWorkflowReveal();
  return (
<div className="enterprise-main bms-main">
      <section className="enterprise-hero bms-hero" aria-labelledby="bms-hero-title">
        <img src="/site-assets/bms-hero.webp" alt="منظومة رقمية ذكية للتحكم المركزي في مرافق المبنى" />
        <div className="enterprise-hero-shade"></div>
        <div className="enterprise-hero-content">
          <h1 id="bms-hero-title">تحكم مركزي ذكي يجمع مرافق المبنى في منظومة واحدة متناغمة</h1>
          <p>يعزز الكفاءة التشغيلية، ويرفع مستوى الأمان، ويخفض استهلاك الطاقة ضمن بيئة أكثر ذكاءً واستدامة.</p>
        </div>
      </section>

      <section className="enterprise-introduction bms-introduction" aria-label="مقدمة عن أنظمة إدارة المباني">
        <div className="enterprise-introduction-inner">
          <p className="enterprise-intro-text">أنظمة إدارة المباني <bdi>(Building Management Systems – BMS)</bdi> هي منظومة تحكم مركزية ذكية تُمكّن من مراقبة وإدارة وتشغيل الأنظمة الحيوية داخل المبنى من خلال منصة موحدة. تعمل هذه الأنظمة على ربط التكييف، والإضاءة، والطاقة، وأنظمة السلامة والأمن ضمن بيئة تشغيل متكاملة تعزز الكفاءة التشغيلية، وترفع مستوى الأمان، وتخفض التكاليف على المدى الطويل.</p>
          <p className="enterprise-intro-text">في <strong>المتقدم</strong>، لا نوفر نظام تحكم تقني فحسب، بل نبتكر بيئة تشغيل ذكية تدعم استدامة المبنى وجاهزيته المستقبلية.</p>
        </div>
      </section>

      <section className="enterprise-services bms-scope" aria-labelledby="bms-scope-title">
        <div className="enterprise-services-inner">
          <div className="enterprise-services-lead">
            <h2 id="bms-scope-title">نطاق حلول أنظمة إدارة المباني</h2>
          </div>

          <div className="enterprise-services-grid">
            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-compass-drafting" aria-hidden="true"></i><h3>التصميم الهندسي المتكامل</h3></div>
              <p>دراسة البنية الكهربائية والميكانيكية للمبنى وتصميم هيكل <bdi>BMS</bdi> مخصص يتوافق مع طبيعة النشاط، وحجم المنشأة، ومتطلبات التشغيل الحالية والمستقبلية.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-temperature-half" aria-hidden="true"></i><h3>ربط وإدارة أنظمة التكييف</h3></div>
              <p>تحكم ذكي في أنظمة التكييف والتهوية وفق معدلات الإشغال والظروف البيئية، لتحقيق استقرار حراري مثالي وتقليل استهلاك الطاقة.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-lightbulb" aria-hidden="true"></i><h3>أنظمة التحكم بالإضاءة الذكية</h3></div>
              <p>إدارة الإضاءة تلقائيًا حسب الحركة، أو التوقيت، أو السيناريوهات المبرمجة، مما يساهم في تقليل الهدر وتحسين راحة المستخدمين.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-bolt" aria-hidden="true"></i><h3>إدارة ومراقبة استهلاك الطاقة</h3></div>
              <p>مراقبة الأحمال الكهربائية وتحليل بيانات الاستهلاك عبر لوحة تحكم مركزية، لدعم قرارات تشغيلية دقيقة وخفض التكاليف التشغيلية.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-diagram-project" aria-hidden="true"></i><h3>تكامل الأنظمة عبر بروتوكولات عالمية</h3></div>
              <p>اعتماد معايير مفتوحة مثل <bdi>KNX</bdi> لضمان الاستقرار، والقابلية للتوسع، والتوافق مع مختلف المصنعين دون قيود مستقبلية.</p>
            </article>

            <article className="enterprise-service-card">
              <div className="enterprise-service-title"><i className="fa-solid fa-shield-halved" aria-hidden="true"></i><h3>التكامل مع أنظمة الأمن والسلامة</h3></div>
              <p>ربط <bdi>BMS</bdi> مع أنظمة التحكم بالدخول، وإنذار الحريق، وكاميرات المراقبة لإنشاء بيئة تشغيل مترابطة وآمنة بالكامل.</p>
            </article>

            <article className="enterprise-service-card enterprise-service-card-wide">
              <div className="enterprise-service-title"><i className="fa-solid fa-laptop" aria-hidden="true"></i><h3>المراقبة والتحكم عن بُعد</h3></div>
              <p>لوحة تحكم مركزية مع إمكانية وصول آمن عن بُعد، وتنبيهات فورية للحالات الحرجة لضمان سرعة الاستجابة واستمرارية التشغيل.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="enterprise-workflow bms-why" aria-labelledby="bms-why-title">
        <div className="enterprise-workflow-inner">
          <div className="enterprise-workflow-heading">
            <span>منظومة موحدة بمعايير احترافية</span>
            <h2 id="bms-why-title">لماذا المتقدم في حلول إدارة المباني؟</h2>
          </div>

          <div className="enterprise-workflow-steps" role="list">
            <div className="enterprise-workflow-line" aria-hidden="true"></div>
            <article className="enterprise-workflow-step is-visible" role="listitem">
              <span className="enterprise-workflow-number">01</span>
              <h3>تصميم مخصص</h3>
              <p>نصمم النظام وفق طبيعة منشأتك، وليس اعتمادًا على حلول جاهزة تقليدية.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">02</span>
              <h3>تكامل شامل</h3>
              <p>قدرة عالية على دمج أنظمة التيار الخفيف والبنية التحتية ضمن منظومة موحدة.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">03</span>
              <h3>التزام بالمعايير العالمية</h3>
              <p>حلول مبنية على بروتوكولات مفتوحة وقابلة للتوسع مستقبلًا.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">04</span>
              <h3>تنفيذ منظم</h3>
              <p>تنفيذ احترافي دون تعطيل العمليات داخل المنشأة.</p>
            </article>
            <article className="enterprise-workflow-step" role="listitem">
              <span className="enterprise-workflow-number">05</span>
              <h3>دعم فني محلي</h3>
              <p>استجابة سريعة وخدمة مستمرة لضمان استقرار النظام.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="contact-cta enterprise-contact-cta" aria-labelledby="bms-cta-title">
        <div className="contact-cta-copy">
          <h2 id="bms-cta-title">هل ترغب في تحويل مبناك إلى منظومة تشغيل ذكية؟</h2>
          <p>نساعدك على تصميم نظام إدارة مبانٍ يحقق التوازن بين الكفاءة، والأمان، والاستدامة دون تعقيد تقني. مع المتقدم، يتحول مبناك إلى منظومة ذكية تعمل بكفاءة وأمان واستدامة اليوم وللمستقبل.</p>
        </div>
        <Link className="contact-cta-button" to="/contact">اطلب تقييمًا فنيًا لمبناك <span aria-hidden="true">←</span></Link>
      </section>
    </div>
  );
}
