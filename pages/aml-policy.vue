<script setup lang="ts">
const title = 'Anti-Money Laundering Policy — The Aidi Group'
const description = 'How Aidi prevents, detects and reports money laundering and terrorist financing.'
useHead({ title, link: [{ rel: 'canonical', href: 'https://theaidigroup.com/aml-policy' }], meta: [{ name: 'description', content: description }, { property: 'og:title', content: title }, { property: 'og:description', content: description }] })
</script>

<template>
  <div>
    <header class="lg-hero">
      <div class="wrap lg-hero-in">
        <span class="eyebrow light">Legal</span>
        <h1 class="t-display">Anti-Money Laundering Policy</h1>
      </div>
    </header>
    <div class="wrap page-body prose lg-body">
      <h2>Overview</h2>
      <p>At Aidi, we are committed to upholding the highest standards of integrity and compliance in our operations worldwide. As part of our dedication to ethical practices, we have implemented this Anti-Money Laundering (AML) policy to prevent, detect, and report money laundering and terrorist financing activities. This policy aligns with applicable laws and regulations, including local and international AML standards.</p>
      <h2>Scope</h2>
      <p>This policy applies to all Aidi employees, contractors, agents, and affiliated entities globally. It is designed to ensure compliance across all business activities, including interactions with customers, suppliers, and partners.</p>
      <h2>What is Money Laundering?</h2>
      <p>Money laundering is the act of disguising the origins of illicit funds to make them appear legitimate. It involves three key stages:</p>
      <ol>
        <li><strong>Placement:</strong> Introducing illegal funds into the financial system.</li>
        <li><strong>Layering:</strong> Concealing the origin through complex transactions.</li>
        <li><strong>Integration:</strong> Returning the funds to the economy as legitimate assets.</li>
      </ol>
      <h2>Key AML Measures</h2>
      <ol>
        <li><strong>Customer Due Diligence (CDD):</strong> Verify the identity of all customers and business partners before establishing a relationship. Conduct enhanced due diligence (EDD) for high-risk individuals, such as politically exposed persons (PEPs).</li>
        <li><strong>Transaction Monitoring:</strong> Monitor transactions for suspicious patterns, including unusually large sums or activity inconsistent with customer profiles.</li>
        <li><strong>Reporting Suspicious Activity:</strong> Report suspicious transactions to the relevant local and international financial crimes enforcement authorities.</li>
        <li><strong>Record-Keeping:</strong> Maintain records of all customer interactions, transactions, and reports for at least five years.</li>
      </ol>
      <h2>Training and Awareness</h2>
      <p>Aidi provides mandatory AML training to all employees. This training ensures:</p>
      <ul>
        <li>Awareness of money laundering risks.</li>
        <li>Identification of suspicious activities.</li>
        <li>Understanding of reporting requirements.</li>
      </ul>
      <h2>Non-Compliance</h2>
      <p>Non-compliance with this policy may result in disciplinary action, termination of employment, or reporting to regulatory authorities.</p>
      <h2>Whistleblower Protection</h2>
      <p>We encourage employees and stakeholders to report potential violations of this policy. Whistleblowers are protected from retaliation and may report anonymously through secure channels.</p>
      <h2>Policy Review</h2>
      <p>This AML policy is reviewed annually and updated as necessary to comply with evolving laws and industry standards. For more information or to report a concern, please contact us at <a href="mailto:partners@theaidigroup.com">partners@theaidigroup.com</a>.</p>
    </div>
  </div>
</template>

<style scoped>
.lg-hero { background: var(--c-navy); padding: 160px 0 70px; }
.lg-hero-in { max-width: 860px; }
.lg-hero .t-display { color: #fff; margin-top: 12px; }
.lg-body { max-width: 780px; padding-top: 48px; padding-bottom: 80px; }
.lg-body h2 { margin: 36px 0 12px; }
.lg-body ol, .lg-body ul { padding-left: 22px; }
.lg-body li { margin: 6px 0; }
@media (max-width: 880px) { .lg-hero { padding: 120px 0 56px; } }
</style>
