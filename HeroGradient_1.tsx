'use client'

/**
 * Hero gradient — Жуковский / тема Graphite
 * Библиотека: @shadergradient/react
 *   npm i @shadergradient/react three @react-three/fiber
 *
 * Слой кладётся под контент hero: absolute, pointer-events: none, z-index ниже текста.
 * Меняется только тройка цветов — геометрия, камера и шум одинаковые в обеих темах.
 */

import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'

/** Цвета градиента по темам. Завязаны на токены — при правке токенов править здесь же. */
const GRADIENT_COLORS = {
  light: {
    color1: '#a6cdf7', // --color-brand-200
    color2: '#eaf4fe', // --color-brand-50
    color3: '#ffffff', // --color-bg-page
  },
  dark: {
    color1: '#2b5f9e', // приглушённый brand — синее свечение
    color2: '#16293d', // тёмный сине-серый, переход
    color3: '#1d1d1f', // --color-bg-contrast
  },
} as const

type Theme = keyof typeof GRADIENT_COLORS

export function HeroGradient({ theme = 'light' }: { theme?: Theme }) {
  const colors = GRADIENT_COLORS[theme]

  return (
    <ShaderGradientCanvas
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      pixelDensity={1}          // в проде 1–1.5; 3 — только для превью в редакторе
      fov={45}
      pointerEvents="none"
    >
      <ShaderGradient
        animate="on"
        type="plane"
        shader="defaults"
        // --- цвета темы ---
        {...colors}
        brightness={1.2}
        grain="off"
        lightType="3d"
        envPreset="city"
        reflection={0.1}
        // --- камера ---
        cDistance={2.81}
        cAzimuthAngle={180}
        cPolarAngle={90}
        cameraZoom={1}
        fov={45}
        // --- положение плоскости ---
        positionX={-2.2}
        positionY={0.4}
        positionZ={0.1}
        rotationX={0}
        rotationY={10}
        rotationZ={50}
        // --- шум / форма ---
        uStrength={2.6}
        uDensity={1.5}
        uAmplitude={1}
        uFrequency={5.5}
        uSpeed={0.3}
        uTime={0}
        // --- прочее ---
        pixelDensity={3}
        range="enabled"
        rangeStart={0}
        rangeEnd={40}
        frameRate={10}
        format="gif"
        destination="onCanvas"
        embedMode="off"
        axesHelper="off"
        gizmoHelper="hide"
        wireframe={false}
      />
    </ShaderGradientCanvas>
  )
}

/**
 * Альтернатива: те же настройки одной строкой (urlString) —
 * компонент разбирает query-параметры сам. Для тёмной темы подменить color1/2/3.
 *
 * <ShaderGradient
 *   control="query"
 *   urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=off&brightness=1.2&cAzimuthAngle=180&cDistance=2.81&cPolarAngle=90&cameraZoom=1&color1=%23a6cdf7&color2=%23eaf4fe&color3=%23ffffff&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=3&positionX=-2.2&positionY=0.4&positionZ=0.1&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=10&rotationZ=50&shader=defaults&type=plane&uAmplitude=1&uDensity=1.5&uFrequency=5.5&uSpeed=0.3&uStrength=2.6&uTime=0&wireframe=false"
 * />
 */

/**
 * Требования к внедрению:
 *  1. pixelDensity в проде — 1–1.5, DPR ограничить (3 греет ноутбуки).
 *  2. Пауза рендера, когда hero вне вьюпорта (IntersectionObserver).
 *  3. prefers-reduced-motion → animate="off", статичный кадр.
 *  4. Фолбэк до загрузки WebGL / при его отсутствии — CSS-градиент:
 *       light: linear-gradient(135deg, #a6cdf7 0%, #eaf4fe 45%, #ffffff 100%)
 *       dark:  linear-gradient(135deg, #2b5f9e 0%, #16293d 45%, #1d1d1f 100%)
 *  5. Переключение темы — смена тройки цветов без перемонтирования канваса,
 *     переход плавный (цвета анимируются), канвас не мигает.
 *  6. Контраст: в light градиент остаётся светлым под H1 #1d1d1f,
 *     в dark — тёмным под текст #f5f5f7, в любой фазе анимации.
 */
