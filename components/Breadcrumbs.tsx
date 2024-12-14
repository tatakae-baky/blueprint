import { ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface BreadcrumbsProps {
  queryHistory: Array<{ idea: string; focusArea: string | null }>;
  currentDepth: number;
  onNavigate: (index: number) => void;
}

export default function Breadcrumbs({ queryHistory, currentDepth, onNavigate }: BreadcrumbsProps) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {queryHistory.map((query, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
            <Button
              variant="link"
              onClick={() => onNavigate(index)}
              className={index === queryHistory.length - 1 ? 'font-semibold' : ''}
            >
              {query.focusArea || query.idea.substring(0, 20)}
            </Button>
          </li>
        ))}
      </ol>
    </nav>
  )
}

