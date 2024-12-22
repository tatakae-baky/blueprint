import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { ChevronDown, ChevronRight, Maximize2, Minimize2, Download, FileJson, FileText, Printer } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import html2pdf from 'html2pdf.js'

interface Component {
  name: string;
  description: string;
  requirements: string[];
}

interface Service {
  name: string;
  description: string;
  requirements: string[];
}

interface PriorityLevel {
  frontend: {
    components: Component[];
  };
  backend: {
    services: Service[];
    dataModel: string[];
  };
}

interface DevelopmentPhase {
  phase: string;
  tasks: string[];
  priority: string;
}

interface Breakdown {
  overview: string;
  priorities: {
    p0: PriorityLevel;
    p1: PriorityLevel;
    p2: PriorityLevel;
  };
  developmentSteps: DevelopmentPhase[];
}

interface IdeaBreakdownProps {
  breakdown: Breakdown;
}

export default function IdeaBreakdown({
  breakdown,
}: IdeaBreakdownProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['overview', 'p0'])
  const [expandedComponents, setExpandedComponents] = useState<string[]>([])

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionName)
        ? prev.filter(name => name !== sectionName)
        : [...prev, sectionName]
    )
  }

  const toggleComponentExpansion = (componentName: string) => {
    setExpandedComponents(prev =>
      prev.includes(componentName)
        ? prev.filter(name => name !== componentName)
        : [...prev, componentName]
    )
  }

  const toggleAll = () => {
    const allSections = ['overview', 'p0', 'p1', 'p2', 'developmentSteps']
    const allComponents = [
      ...breakdown.priorities.p0.frontend.components.map(c => c.name),
      ...breakdown.priorities.p0.backend.services.map(s => s.name),
      ...breakdown.priorities.p1.frontend.components.map(c => c.name),
      ...breakdown.priorities.p1.backend.services.map(s => s.name),
      ...breakdown.priorities.p2.frontend.components.map(c => c.name),
      ...breakdown.priorities.p2.backend.services.map(s => s.name),
    ]
    
    if (expandedSections.length === allSections.length && 
        expandedComponents.length === allComponents.length) {
      // Collapse all
      setExpandedSections([])
      setExpandedComponents([])
    } else {
      // Expand all
      setExpandedSections(allSections)
      setExpandedComponents(allComponents)
    }
  }

  const renderComponent = (component: Component, index: number) => (
    <Card key={index} className="mt-4 blueprint-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between blueprint-text">
          <span>{component.name}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleComponentExpansion(component.name)}
            className="blueprint-button"
          >
            {expandedComponents.includes(component.name) ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-2 blueprint-text">{component.description}</p>
        {expandedComponents.includes(component.name) && (
          <div>
            <h5 className="blueprint-subheading mb-2 mt-6">Requirements:</h5>
            <ul className="list-disc pl-5 blueprint-text">
              {component.requirements.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )

  const renderService = (service: Service, index: number ) => (
    <Card key={index} className="mt-4 blueprint-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between blueprint-text">
          <span>{service.name}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleComponentExpansion(service.name)}
            className="blueprint-button"
          >
            {expandedComponents.includes(service.name) ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-2 blueprint-text">{service.description}</p>
        {expandedComponents.includes(service.name) && (
          <div>
            <h5 className="blueprint-subheading mb-2 mt-6">Requirements:</h5>
            <ul className="list-disc pl-5 blueprint-text">
              {service.requirements.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )

  const renderPriorityLevel = (priority: 'p0' | 'p1' | 'p2') => (
    <Card key={priority} className="mt-6 blueprint-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between blueprint-text">
          <span>Priority {priority.toUpperCase()}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleSection(priority)}
            className="blueprint-button"
          >
            {expandedSections.includes(priority) ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      {expandedSections.includes(priority) && (
        <CardContent>
          <h4 className="blueprint-subheading mt-6 mb-2">Frontend Components:</h4>
          {breakdown.priorities[priority]?.frontend?.components?.map((component, index) =>
            renderComponent(component, index)
          ) || <p className="blueprint-text">No frontend components for this priority level.</p>}
          <h4 className="blueprint-subheading mt-8">Backend Services:</h4>
          {breakdown.priorities[priority]?.backend?.services?.map((service, index) =>
            renderService(service, index)
          ) || <p className="blueprint-text">No backend services for this priority level.</p>}
          <div className="mt-4">
            <h4 className="blueprint-subheading mb-2 mt-8">Data Model:</h4>
            {breakdown.priorities[priority]?.backend?.dataModel?.length > 0 ? (
              <ul className="list-disc pl-5 blueprint-text">
                {breakdown.priorities[priority].backend.dataModel.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="blueprint-text">No data model defined for this priority level.</p>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  )

  const exportToPDF = async () => {
    const element = document.getElementById('idea-breakdown')
    if (!element) return

    const opt = {
      margin: 1,
      filename: 'blueprint-breakdown.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }

    try {
      await html2pdf().set(opt).from(element).save()
    } catch (error) {
      console.error('Error generating PDF:', error)
    }
  }

  const exportToJSON = () => {
    const dataStr = JSON.stringify(breakdown, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    const exportFileDefaultName = 'blueprint-breakdown.json'

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const exportToMarkdown = () => {
    let md = `# Project Blueprint Breakdown\n\n`
    
    // Add Overview
    md += `## Overview\n\n${breakdown.overview}\n\n`
    
    // Add Priorities
    const priorities = ['p0', 'p1', 'p2'] as const
    priorities.forEach(p => {
      md += `## Priority ${p.toUpperCase()}\n\n`
      
      // Frontend Components
      md += `### Frontend Components\n\n`
      const components = breakdown.priorities[p]?.frontend?.components || []
      components.forEach(comp => {
        md += `#### ${comp.name}\n\n`
        md += `${comp.description}\n\n`
        md += `**Requirements:**\n\n`
        comp.requirements.forEach(req => {
          md += `- ${req}\n`
        })
        md += '\n'
      })
      
      // Backend Services
      md += `### Backend Services\n\n`
      const services = breakdown.priorities[p]?.backend?.services || []
      services.forEach(service => {
        md += `#### ${service.name}\n\n`
        md += `${service.description}\n\n`
        md += `**Requirements:**\n\n`
        service.requirements.forEach(req => {
          md += `- ${req}\n`
        })
        md += '\n'
      })
      
      // Data Model
      md += `### Data Model\n\n`
      const dataModel = breakdown.priorities[p]?.backend?.dataModel || []
      dataModel.forEach(item => {
        md += `- ${item}\n`
      })
      md += '\n'
    })
    
    // Development Steps
    md += `## Development Steps\n\n`
    breakdown.developmentSteps.forEach(step => {
      md += `### ${step.phase} (${step.priority})\n\n`
      step.tasks.forEach(task => {
        md += `- ${task}\n`
      })
      md += '\n'
    })

    const dataUri = 'data:text/markdown;charset=utf-8,'+ encodeURIComponent(md)
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', 'blueprint-breakdown.md')
    linkElement.click()
  }

  return (
    <div className="space-y-6" id="idea-breakdown">
      <div className="flex justify-end gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="blueprint-button-secondary gap-2"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={exportToPDF}>
              <Printer className="h-4 w-4 mr-2" />
              Export as PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={exportToJSON}>
              <FileJson className="h-4 w-4 mr-2" />
              Export as JSON
            </DropdownMenuItem>
            <DropdownMenuItem onClick={exportToMarkdown}>
              <FileText className="h-4 w-4 mr-2" />
              Export as Markdown
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          size="sm"
          onClick={toggleAll}
          className="blueprint-button-secondary gap-2"
        >
          {expandedSections.length === 5 ? (
            <>
              <Minimize2 className="h-4 w-4" />
              Collapse All
            </>
          ) : (
            <>
              <Maximize2 className="h-4 w-4" />
              Expand All
            </>
          )}
        </Button>
      </div>

      <Card className="blueprint-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between blueprint-text">
            <span>Overview</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleSection('overview')}
              className="blueprint-button"
            >
              {expandedSections.includes('overview') ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </CardTitle>
        </CardHeader>
        {expandedSections.includes('overview') && (
          <CardContent>
            <p className="blueprint-text pr-8">{breakdown.overview}</p>
          </CardContent>
        )}
      </Card>

      {renderPriorityLevel('p0')}
      {renderPriorityLevel('p1')}
      {renderPriorityLevel('p2')}

      <Card className="blueprint-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between blueprint-text">
            <span>Development Steps</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleSection('developmentSteps')}
              className="blueprint-button"
            >
              {expandedSections.includes('developmentSteps') ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </CardTitle>
        </CardHeader>
        {expandedSections.includes('developmentSteps') && (
          <CardContent>
            {breakdown.developmentSteps.map((phase, index) => (
              <div key={index} className="mb-4 mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="blueprint-subheading">{phase.phase}</h4>
                  <Badge className="mx-1 blueprint-text bg-blue-200/10">{phase.priority}</Badge>
                </div>
                <ul className="list-disc pl-5 blueprint-text">
                  {phase.tasks.map((task, taskIndex) => (
                    <li key={taskIndex}>{task}</li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        )}
      </Card>
    </div>
  )
}

