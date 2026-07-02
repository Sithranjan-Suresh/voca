import { useState } from 'react'
import { CATEGORIES, CATEGORY_ICONS, CONCEPTS_BY_CATEGORY } from '../data/concepts'
import ConceptIcon from './ConceptIcon'

export default function CategoryGrid({ selectedConceptIds, onToggle }) {
  const [openCategory, setOpenCategory] = useState(null)

  function handleCategoryClick(cat) {
    setOpenCategory(prev => (prev === cat ? null : cat))
  }

  return (
    <section className="category-section" aria-label="Concept categories">
      <div className="category-grid">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`category-tile${openCategory === cat ? ' active' : ''}`}
            onClick={() => handleCategoryClick(cat)}
            aria-expanded={openCategory === cat}
          >
            <span className="category-tile-icon" aria-hidden="true">{CATEGORY_ICONS[cat]}</span>
            <span className="category-tile-label">{cat}</span>
          </button>
        ))}
      </div>

      {openCategory && (
        <div className="category-panel" role="group" aria-label={`${openCategory} concepts`}>
          <div className="concept-grid">
            {CONCEPTS_BY_CATEGORY[openCategory].map(concept => (
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
    </section>
  )
}
