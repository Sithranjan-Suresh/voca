import { useState } from 'react'
import { motion } from 'framer-motion'
import { CATEGORIES, CATEGORY_SVGS, CONCEPTS_BY_CATEGORY } from '../data/concepts'
import ConceptIcon from './ConceptIcon'

const tileVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.06, type: 'spring', stiffness: 130, damping: 14 },
  }),
}

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
            <motion.button
              className={`category-tile emergency emergency-hero${isOpen ? ' active' : ''}`}
              onClick={() => toggleCategory(cat)}
              aria-expanded={isOpen}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 140, damping: 14 }}
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
            </motion.button>

            {isOpen && (
              <motion.div
                className="category-panel"
                role="group"
                aria-label="Emergency concepts"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 160, damping: 18 }}
              >
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
              </motion.div>
            )}
          </div>
        )
      })()}

      {/* Regular categories — 3-column grid */}
      <div className="category-grid">
        {regularCategories.map((cat, i) => {
          const isOpen = openCategories.has(cat)
          const selectedInCat = CONCEPTS_BY_CATEGORY[cat].filter(c =>
            selectedConceptIds.includes(c.id)
          ).length
          return (
            <motion.button
              key={cat}
              className={`category-tile${isOpen ? ' active' : ''}`}
              onClick={() => toggleCategory(cat)}
              aria-expanded={isOpen}
              custom={i}
              variants={tileVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
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
            </motion.button>
          )
        })}
      </div>

      {regularCategories.filter(cat => openCategories.has(cat)).map(cat => (
        <motion.div
          key={cat}
          className="category-panel"
          role="group"
          aria-label={`${cat} concepts`}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 160, damping: 18 }}
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
        </motion.div>
      ))}
    </section>
  )
}
