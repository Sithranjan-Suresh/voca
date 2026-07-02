import { useState } from 'react'
import { CATEGORIES, CATEGORY_ICONS, CONCEPTS_BY_CATEGORY } from '../data/concepts'
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

  return (
    <section className="category-section" aria-label="Concept categories">
      <div className="category-grid">
        {CATEGORIES.map(cat => {
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
              <span className="category-tile-icon" aria-hidden="true">{CATEGORY_ICONS[cat]}</span>
              <span className="category-tile-label">{cat}</span>
            </button>
          )
        })}
      </div>

      {CATEGORIES.filter(cat => openCategories.has(cat)).map(cat => (
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
