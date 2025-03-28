export const features = {
  // Recursos principais
  dashboard: true,
  students: true,
  interventions: true,
  assessments: true,
  teams: true,
  reports: true,
  
  // Recursos avançados
  ai: {
    enabled: false,
    prediction: false,
    recommendations: false,
  },
  
  // Integrações
  integrations: {
    lti: false,
    microsoft: false,
    google: false,
  },
  
  // Experiência mobile
  mobile: {
    offline: false,
    push: false,
  },
  
  // Customização
  customization: {
    themes: true,
    dashboards: false,
  },
}; 