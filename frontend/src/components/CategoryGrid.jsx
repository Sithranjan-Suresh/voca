import { useState } from 'react'
import { CATEGORIES, CATEGORY_SVGS, CONCEPTS_BY_CATEGORY } from '../data/concepts'
// Note: CATEGORY_ICONS removed — now using CATEGORY_SVGS (inline SVG strings)
import ConceptIcon from './ConceptIcon'

export default function CategoryGrid({ selectedConceptIds, onToggle }) {
  const [openCategories, setOpenCategories] = useState(new Set())

  function toggleCategory(cat) {
    setOpenCategories(prev => {
      const next = new Set(prev)
      next.has(cat) ? next.delete(cat) : next.add(cat)
      return next
    })
  }

  const regularCategories = CATEGORIES.filter(c => c !== 'Emergency')

  return (
    <section className="category-section" aria-label="Concept categories">

      {/* Emergency — full-width hero tile */}
      {(() => {
        const cat = 'Emergency'
        const isOpen = openCategories.has(cat)
        const selectedInCat = CONCEPTS_BY_CATEGORY[cat].filter(c =>
          selectedConceptIds.includes(c.id)
        ).length
        return (
          <div className="emergency-hero-wrapper">
            <button
              className={`category-tile emergency emergency-hero${isOpen ? ' active' : ''}`}
              onClick={() => toggleCategory(cat)}
              aria-expanded={isOpen}
            >
              {selectedInCat > 0 && (
                <span className="category-badge" aria-label={`${selectedInCat} selected`}>
                  {selectedInCat}
                </span>
              )}
              <span
                className="category-tile-icon category-tile-svg"
                aria-hidden="true"
                dangerouslySetInnerHTML={{ __html: CATEGORY_SVGS[cat] }}
              />
              <span className="category-tile-label">{cat}</span>
              <span className="emergency-hero-sub">Chest pain · Fall · Can't breathe · Call 911</span>
            </button>

            {isOpen && (
              <div className="category-panel" role="group" aria-label="Emergency concepts">
                <p className="panel-category-label">Emergency</p>
                <div className="concept-grid">
                  {CONCEPTS_BY_CATEGORY[cat].map(concept => (
                    <ConceptIcon
                      key={concept.id}
                      concept={concept}
                      selected={selectedConceptIds.includes(concept.id)}
                      onToggle={() => onToggle(concept.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      })()}

      {/* Regular categories — 3-column grid */}
      <div className="category-grid">
        {regularCategories.map(cat => {
          const isOpen = openCategories.has(cat)
          const selectedInCat = CONCEPTS_BY_CATEGORY[cat].filter(c =>
            selectedConceptIds.includes(c.id)
          ).length
          return (
            <button
              key={cat}
              className={`category-tile${isOpen ? ' active' : ''}`}
              onClick={() => toggleCategory(cat)}
              aria-expanded={isOpen}
            >
              {selectedInCat > 0 && (
                <span className="category-badge" aria-label={`${selectedInCat} selected`}>
                  {selectedInCat}
                </span>
              )}
              <span
                className="category-tile-icon category-tile-svg"
                aria-hidden="true"
                dangerouslySetInnerHTML={{ __html: CATEGORY_SVGS[cat] }}
              />
              <span className="category-tile-label">{cat}</span>
            </button>
          )
        })}
      </div>

      {regularCategories.filter(cat => openCategories.has(cat)).map(cat => (
        <div
          key={cat}
          className="category-panel"
          role="group"
          aria-label={`${cat} concepts`}
        >
          <p className="panel-category-label">{cat}</p>
          <div className="concept-grid">
            {CONCEPTS_BY_CATEGORY[cat].map(concept => (
              <ConceptIcon
                key={concept.id}
                concept={concept}
                selected={selectedConceptIds.includes(concept.id)}
                onToggle={() => onToggle(concept.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
