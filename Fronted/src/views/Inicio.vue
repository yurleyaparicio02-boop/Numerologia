<template>
  <div class="home-page">
    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg">
        <div class="constellation"></div>
      </div>
      <div class="container hero-content">
        <h1 class="hero-title">
          <span class="title-line1">Descubre tu</span>
          <span class="title-line2">Destino <span class="title-accent">Cósmico</span></span>
        </h1>
        <p class="hero-sub">Los números y las estrellas revelan tu camino. Explora tu perfil numerológico, recibe lecturas personalizadas y descubre tu compatibilidad cósmica.</p>
        <div class="hero-actions">
          <router-link to="/perfil" class="btn btn-primary">
            <i class="fas fa-star"></i> Mi Perfil Numerológico
          </router-link>
          <router-link to="/lecturas" class="btn btn-outline">
            <i class="fas fa-book-open"></i> Ver Lecturas
          </router-link>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="features container">
      <div class="features-grid">
        <div class="feature-card" v-for="f in features" :key="f.title">
          <div class="feature-icon" :style="{ background: f.gradient }">
            <i :class="f.icon"></i>
          </div>
          <h3>{{ f.title }}</h3>
          <p>{{ f.desc }}</p>
          <router-link :to="f.link" class="feature-link">
            Explorar <i class="fas fa-arrow-right"></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Numerología rápida -->
    <section class="quick-num container">
      <div class="card quick-card">
        <h2><i class="fas fa-calculator"></i> Calculadora Rápida</h2>
        <p class="quick-desc">Ingresa tu fecha de nacimiento y descubre tu Número de Vida al instante.</p>
        <div class="quick-form">
          <input type="date" v-model="birthDate" class="form-input" />
          <button class="btn btn-gold" @click="calcLifeNumber">
            <i class="fas fa-magic"></i> Calcular
          </button>
        </div>
        <transition name="slide-up">
          <div v-if="lifeNumber" class="quick-result">
            <div class="result-number">{{ lifeNumber }}</div>
            <div class="result-label">Número de Vida</div>
            <p class="result-meaning">{{ numberMeanings[lifeNumber] || 'Significado misterioso' }}</p>
          </div>
        </transition>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const birthDate = ref('')
const lifeNumber = ref(null)

const features = [
  {
    title: 'Perfil Numerológico',
    desc: 'Conoce tu Número de Vida, de Expresión y de Alma. Tres claves que revelan tu esencia.',
    icon: 'fas fa-fingerprint',
    gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
    link: '/perfil'
  },
  {
    title: 'Lecturas Astrales',
    desc: 'Recibe lecturas diarias, generales o anuales guiadas por la sabiduría de los números.',
    icon: 'fas fa-book-open',
    gradient: 'linear-gradient(135deg, #d97706, #fbbf24)',
    link: '/lecturas'
  },
  {
    title: 'Compatibilidad',
    desc: 'Descubre la sinergia numérica entre dos personas y su interpretación cósmica.',
    icon: 'fas fa-heart',
    gradient: 'linear-gradient(135deg, #be185d, #f472b6)',
    link: '/compatibilidad'
  }
]

const numberMeanings = {
  1: '⚡ Líder pionero — Independencia, ambición y creatividad sin límites.',
  2: '🤝 Armonizador — Diplomacia, sensibilidad y unión.',
  3: '🎨 Expresivo — Creatividad, alegría y comunicación.',
  4: '🏗️ Constructor — Estabilidad, disciplina y trabajo duro.',
  5: '🌪️ Libertador — Aventura, versatilidad y cambio.',
  6: '💕 Nutridor — Responsabilidad, amor y armonía familiar.',
  7: '🔮 Buscador — Espiritualidad, análisis y sabiduría interior.',
  8: '💰 Poder — Abundancia, autoridad y logro material.',
  9: '🌍 Humanista — Compasión, idealismo y servicio al mundo.'
}

function calcLifeNumber() {
  if (!birthDate.value) return
  const digits = birthDate.value.replace(/-/g, '').split('').map(Number)
  let sum = digits.reduce((a, b) => a + b, 0)
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = String(sum).split('').map(Number).reduce((a, b) => a + b, 0)
  }
  lifeNumber.value = sum
}
</script>

<style scoped>
.hero {
  position: relative;
  padding: 6rem 0 4rem;
  overflow: hidden;
}
.hero-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.15) 0%, transparent 70%);
  pointer-events: none;
}
.hero-content {
  text-align: center;
  position: relative;
  z-index: 1;
}
.hero-title {
  font-family: var(--font-display);
  line-height: 1.1;
  margin-bottom: 1.25rem;
}
.title-line1 {
  display: block;
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--text-secondary);
  letter-spacing: 0.15em;
  text-transform: uppercase;
}
.title-line2 {
  display: block;
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--text-primary);
}
.title-accent {
  color: var(--gold);
  text-shadow: 0 0 30px rgba(251,191,36,0.3);
}
.hero-sub {
  max-width: 600px;
  margin: 0 auto 2rem;
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.7;
}
.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Features */
.features {
  padding: 3rem 0;
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}
.feature-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 2rem;
  transition: all var(--transition);
  position: relative;
  overflow: hidden;
}
.feature-card::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: 0;
  transition: opacity var(--transition);
}
.feature-card:hover {
  transform: translateY(-4px);
  border-color: var(--border-glow);
  box-shadow: var(--shadow-glow);
}
.feature-card:hover::after { opacity: 1; }
.feature-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  color: #fff;
  margin-bottom: 1rem;
}
.feature-card h3 {
  font-family: var(--font-display);
  font-size: 1.15rem;
  color: var(--text-glow);
  margin-bottom: 0.5rem;
}
.feature-card p {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
}
.feature-link {
  font-size: 0.85rem;
  color: var(--accent);
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-weight: 500;
}
.feature-link:hover { color: var(--accent-bright); gap: 0.6rem; }

/* Quick calc */
.quick-num {
  padding: 2rem 0 4rem;
}
.quick-card {
  text-align: center;
}
.quick-card h2 {
  font-family: var(--font-display);
  font-size: 1.3rem;
  color: var(--text-glow);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
.quick-desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}
.quick-form {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 400px;
  margin: 0 auto;
}
.quick-form .form-input {
  flex: 1;
  min-width: 180px;
}
.quick-result {
  margin-top: 1.5rem;
}
.result-number {
  font-family: var(--font-display);
  font-size: 4rem;
  font-weight: 700;
  color: var(--gold);
  text-shadow: 0 0 30px rgba(251,191,36,0.4);
  line-height: 1;
}
.result-label {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--text-muted);
  margin-bottom: 0.75rem;
}
.result-meaning {
  font-size: 1rem;
  color: var(--text-secondary);
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.6;
}
</style>