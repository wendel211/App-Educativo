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
    modules: [
      {
        type: "learn",
        title: "O que são Doenças Cardíacas Congênitas?",
        content: "São malformações estruturais do coração presentes desde o nascimento. Elas podem variar de simples defeitos, como um pequeno orifício entre câmaras cardíacas, até alterações complexas na anatomia cardíaca.",
        videoUrl: "https://www.youtube.com/watch?v=kQrF1HS3mR8",
        references: [
          "https://www.scielo.br/congenitas",
          "https://www.cardiol.br/congenitas-info"
        ]
      },
      {
        type: "quiz",
        title: "Teste seus conhecimentos sobre doenças congênitas",
        questions: [
          {
            question: "O que caracteriza uma doença cardíaca congênita?",
            options: ["É adquirida após infecções", "É causada por tabagismo", "Está presente desde o nascimento"],
            correctAnswer: "Está presente desde o nascimento"
          }
        ]
      },
      {
        type: "habits",
        title: "Cuidados com Doenças Cardíacas Congênitas",
        checklist: [
          "Realizar acompanhamento médico regular",
          "Evitar atividades físicas intensas sem avaliação",
          "Manter vacinação em dia"
        ]
      }
    ]
  },
  "3": {
    name: "Doenças das Valvas Cardíacas",
    modules: [
      {
        type: "learn",
        title: "O que são Doenças das Valvas Cardíacas?",
        content: "São alterações nas estruturas que controlam o fluxo de sangue dentro do coração. As valvas podem apresentar estreitamento (estenose) ou vazamento (insuficiência).",
        videoUrl: "https://www.youtube.com/watch?v=VKaHjFC3ctQ",
        references: [
          "https://www.cardiol.br/valvulopatias",
          "https://www.scielo.br/valvulas"
        ]
      },
      {
        type: "quiz",
        title: "Teste seus conhecimentos sobre valvulopatias",
        questions: [
          {
            question: "O que é estenose valvar?",
            options: ["Abertura excessiva da valva", "Fechamento incompleto da valva", "Estreitamento da valva"],
            correctAnswer: "Estreitamento da valva"
          }
        ]
      },
      {
        type: "habits",
        title: "Hábitos para pacientes com valvulopatias",
        checklist: [
          "Evitar esforço físico sem orientação",
          "Controlar pressão arterial",
          "Realizar ecocardiogramas periódicos"
        ]
      }
    ]
  },
  "4": {
    name: "Doenças do Miocárdio",
    modules: [
      {
        type: "learn",
        title: "O que são Doenças do Miocárdio?",
        content: "São doenças que afetam diretamente o músculo do coração, como a miocardiopatia dilatada ou hipertrófica. Elas comprometem a força de contração e relaxamento do coração.",
        videoUrl: "https://www.youtube.com/watch?v=pOAHIKL4EqE",
        references: [
          "https://www.scielo.br/miocardio",
          "https://www.cardiol.br/miocardiopatias"
        ]
      },
      {
        type: "quiz",
        title: "Teste seus conhecimentos sobre miocardiopatias",
        questions: [
          {
            question: "O que é uma miocardiopatia?",
            options: ["Infecção das artérias", "Doença do músculo cardíaco", "Doença congênita da válvula"],
            correctAnswer: "Doença do músculo cardíaco"
          }
        ]
      },
      {
        type: "habits",
        title: "Cuidados recomendados para miocardiopatias",
        checklist: [
          "Acompanhar função cardíaca regularmente",
          "Evitar bebidas estimulantes",
          "Seguir dieta com baixo teor de sódio"
        ]
      }
    ]
  },
  "5": {
    name: "Diabetes tipo 1",
    modules: [
      {
        type: "learn",
        title: "O que é Diabetes tipo 1?",
        content: "É uma doença autoimune em que o sistema imunológico ataca as células beta do pâncreas, responsáveis por produzir insulina. Normalmente surge na infância ou adolescência.",
        videoUrl: "https://www.youtube.com/watch?v=diab1",
        references: [
          "https://www.diabetes.org.br/tipo1",
          "https://www.scielo.br/diab1"
        ]
      },
      {
        type: "quiz",
        title: "Teste seus conhecimentos sobre Diabetes tipo 1",
        questions: [
          {
            question: "Em qual fase da vida geralmente surge o Diabetes tipo 1?",
            options: ["Na infância ou adolescência", "Na velhice", "Após os 40"],
            correctAnswer: "Na infância ou adolescência"
          }
        ]
      },
      {
        type: "habits",
        title: "Cuidados recomendados para Diabetes tipo 1",
        checklist: [
          "Monitorar glicemia diariamente",
          "Aplicar insulina conforme prescrição",
          "Manter alimentação balanceada"
        ]
      }
    ]
  },
  "6": {
    name: "Diabetes tipo 2",
    modules: [
      {
        type: "learn",
        title: "O que é Diabetes tipo 2?",
        content: "É uma doença metabólica caracterizada pela resistência à insulina. Está relacionada a fatores como sedentarismo, obesidade e alimentação inadequada.",
        videoUrl: "https://www.youtube.com/watch?v=diab2",
        references: [
          "https://www.diabetes.org.br/tipo2",
          "https://www.scielo.br/diab2"
        ]
      },
      {
        type: "quiz",
        title: "Teste seus conhecimentos sobre Diabetes tipo 2",
        questions: [
          {
            question: "Qual é um fator de risco importante para o Diabetes tipo 2?",
            options: ["Excesso de atividade física", "Obesidade", "Hipotermia"],
            correctAnswer: "Obesidade"
          }
        ]
      },
      {
        type: "habits",
        title: "Cuidados recomendados para Diabetes tipo 2",
        checklist: [
          "Evitar açúcar refinado",
          "Praticar atividade física regularmente",
          "Fazer controle periódico da glicemia"
        ]
      }
    ]
  }
};
