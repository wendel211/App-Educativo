export const diseaseModules = {
  "1": {
    name: "Insuficiência Cardíaca",
    modules: [
      {
        type: "learn",
        title: "O que é Insuficiência Cardíaca?",
        content: "A insuficiência cardíaca é uma condição crônica em que o coração não consegue bombear sangue suficiente para o corpo. Pode ser causada por hipertensão, infarto ou doenças das válvulas cardíacas.",
        videoUrl: "https://www.youtube.com/watch?v=abc123",
        references: [
          "https://www.scielo.br/article1",
          "https://sociedadesbc.org/material"
        ]
      },
      {
        type: "quiz",
        title: "Teste seus conhecimentos sobre IC",
        questions: [
          {
            question: "Qual é uma das principais causas da insuficiência cardíaca?",
            options: ["Diabetes tipo 1", "Hipertensão", "Apendicite"],
            correctAnswer: "Hipertensão"
          },
          {
            question: "O que o coração não consegue fazer na insuficiência cardíaca?",
            options: ["Bombear sangue suficiente", "Respirar corretamente", "Eliminar toxinas"],
            correctAnswer: "Bombear sangue suficiente"
          }
        ]
      },
      {
        type: "habits",
        title: "Hábitos Recomendados para IC",
        checklist: [
          "Reduzir o consumo de sal",
          "Fazer exercícios leves diariamente",
          "Evitar bebidas alcoólicas"
        ]
      }
    ]
  },
  "2": {
    name: "Doenças Cardíacas Congênitas",
    modules: []
  },
  "3": {
    name: "Doenças das Valvas Cardíacas",
    modules: []
  },
  "4": {
    name: "Doenças do Miocárdio",
    modules: []
  },
  "5": {
    name: "Diabetes tipo 1",
    modules: []
  },
  "6": {
    name: "Diabetes tipo 2",
    modules: []
  }
};
