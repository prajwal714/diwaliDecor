import { FeatherIcon } from './Icons'
import { useState } from 'react'
import { categories, products, type Category } from '../data/products'
import { ProductCard } from './ProductCard'

type Props = {
  onAdded: () => void
}

export function ProductGrid({ onAdded }: Props) {
  const [filter, setFilter] = useState<Category | 'All'>('All')

  const visible =
    filter === 'All' ? products : products.filter((p) => p.category === filter)

  return (
    <section className="catalog" id="shop">
      <span className="feather feather-left"><FeatherIcon size={70} /></span>
      <span className="feather feather-right"><FeatherIcon size={70} /></span>
      <div className="section-head">
        <h2>Shop the collection</h2>
        <p>Handcrafted torans for your main door — made for festive homes across India.</p>
      </div>

      <div className="catalog-toolbar">
        <div className="filters" role="tablist" aria-label="Product categories">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={filter === cat}
              className={filter === cat ? 'filter active' : 'filter'}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <p className="product-count">{visible.length} products</p>
      </div>

      <div className="product-grid">
        {visible.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            onAdded={onAdded}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}
