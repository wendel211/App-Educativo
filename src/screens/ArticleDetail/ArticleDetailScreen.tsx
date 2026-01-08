// src/screens/ArticleDetail/ArticleDetailScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import { RouteProp } from '@react-navigation/native';

type ArticleDetailScreenRouteProp = RouteProp<{ params: { topicId: string } }, 'params'>;

type Section = {
  heading: string;
  text: string;
};

interface Article {
  image: any;
  title: string;
  sections: Section[];
}

const ArticleDetailScreen = ({ route }: { route: ArticleDetailScreenRouteProp }) => {
  const { topicId } = route.params;

  let article: Article;

  switch (topicId) {
    case '1':
      article = {
        image: require('../../assets/images/topo_article1.jpg'),
        title: 'Doenças Cardiovasculares: Diretrizes de Prevenção',
        sections: [
          {
            heading: 'Impacto Epidemiológico',
            text: 'Segundo a Sociedade Brasileira de Cardiologia (SBC), as doenças cardiovasculares (DCV) permanecem como a principal causa de mortalidade no Brasil. A hipertensão arterial sistêmica é o fator de risco mais prevalente. O controle da pressão arterial não é apenas uma medida corretiva, mas a única forma comprovada de evitar desfechos graves como o Acidente Vascular Cerebral (AVC) e o Infarto Agudo do Miocárdio.',
          },
          {
            heading: 'A Ciência da Mudança de Estilo de Vida',
            text: 'Estudos clínicos demonstram que a adoção da dieta DASH (Dietary Approaches to Stop Hypertension), rica em frutas, vegetais e pobre em sódio, pode reduzir a pressão sistólica em até 11 mmHg. Além disso, a Organização Mundial da Saúde (OMS) recomenda 150 minutos de atividade física moderada por semana, o que comprovadamente melhora a função endotelial e reduz a resistência vascular periférica.',
          },
          {
            heading: 'Adesão Farmacológica',
            text: 'A não adesão ao tratamento medicamentoso é considerada pela OMS um problema de saúde pública mundial. Em doenças assintomáticas ("silenciosas") como a hipertensão, o paciente tende a abandonar o tratamento ao se sentir bem. No entanto, as diretrizes enfatizam: a proteção cardiovascular depende da constância. A medicação atua prevenindo o remodelamento cardíaco e a aterosclerose a longo prazo.',
          },
          {
            heading: 'Conclusão Baseada em Evidências',
            text: 'O tratamento cardiovascular moderno é multifatorial. A combinação de terapia medicamentosa otimizada com intervenções no estilo de vida reduz drasticamente a mortalidade. O empoderamento do paciente através do monitoramento contínuo é a ferramenta mais eficaz para o sucesso terapêutico.',
          },
        ],
      };
      break;
    case '2':
      article = {
        image: require('../../assets/images/topo_article2.png'),
        title: 'Manejo Clínico do Diabetes Tipo 2',
        sections: [
          {
            heading: 'Fisiopatologia e Metas',
            text: 'O Diabetes Mellitus Tipo 2 (DM2) é caracterizado pela resistência à insulina e falência progressiva das células beta pancreáticas. Segundo a American Diabetes Association (ADA), o objetivo central do tratamento é manter a Hemoglobina Glicada (HbA1c) abaixo de 7% para a maioria dos adultos. Esse marcador reflete a média glicêmica dos últimos 3 meses e é o padrão-ouro para prever o risco de complicações microvasculares (retinopatia, nefropatia e neuropatia).',
          },
          {
            heading: 'O Papel Crítico do Monitoramento',
            text: 'A automonitorização da glicemia capilar é essencial para entender a variabilidade glicêmica. Estudos apontam que pacientes que monitoram e registram seus dados conseguem identificar padrões alimentares nocivos mais rapidamente. O conceito de "Tempo no Alvo" (Time in Range) tem ganhado destaque nas novas diretrizes, valorizando a estabilidade da glicose ao longo do dia, evitando picos (hiperglicemia) e vales (hipoglicemia).',
          },
          {
            heading: 'Intervenção Nutricional',
            text: 'Não existe uma "dieta para diabéticos" única, mas sim padrões alimentares saudáveis. A redução de carboidratos simples e o aumento de fibras solúveis ajudam a diminuir o índice glicêmico das refeições. A perda de peso de 5% a 10% do peso corporal inicial é clinicamente significativa e capaz de melhorar a sensibilidade à insulina, conforme diretrizes da SBD.',
          },
          {
            heading: 'Conclusão',
            text: 'O diabetes é uma condição crônica que exige autogestão ativa. A tecnologia e o registro de dados servem como bússola para o tratamento, permitindo que a equipe médica ajuste as terapias com precisão baseada em dados reais do paciente.',
          },
        ],
      };
      break;
    case '3':
      article = {
        image: require('../../assets/images/topo_article3.png'),
        title: 'Risco Cardiovascular no Paciente Diabético',
        sections: [
          {
            heading: 'A Conexão Metabólica',
            text: 'Existe uma relação intrínseca entre Diabetes e Doença Cardiovascular. Pacientes com DM2 possuem risco de 2 a 4 vezes maior de desenvolver eventos cardiovasculares. Isso ocorre porque a hiperglicemia crônica promove o estresse oxidativo e a inflamação do endotélio (parede dos vasos sanguíneos), acelerando o processo de aterosclerose (acúmulo de placas de gordura).',
          },
          {
            heading: 'Síndrome Metabólica',
            text: 'Frequentemente, o diabetes não vem sozinho. Ele faz parte de um conjunto de condições conhecido como Síndrome Metabólica, que inclui hipertensão, dislipidemia (colesterol alto) e obesidade abdominal. As diretrizes atuais preconizam o tratamento agressivo não apenas da glicose, mas de todos esses fatores de risco simultaneamente para proteger o coração.',
          },
          {
            heading: 'Estratégias de Proteção',
            text: 'O controle rigoroso do LDL-colesterol e da pressão arterial é tão importante quanto o controle da glicose para o paciente diabético. Medicamentos modernos, como os inibidores de SGLT2 e agonistas de GLP-1, demonstraram em grandes ensaios clínicos (CVOTs) capacidade de reduzir mortalidade cardiovascular, independente da redução da glicemia, marcando uma nova era na cardio-diabetologia.',
          },
          {
            heading: 'Mensagem Final',
            text: 'A vigilância deve ser redobrada. O paciente informado entende que cuidar do diabetes é, primordialmente, cuidar da saúde vascular. A integração de dados de saúde e o acompanhamento multidisciplinar são a chave para a longevidade com qualidade.',
          },
        ],
      };
      break;
    default:
      article = {
        image: require('../../assets/images/diabetes-icon.png'),
        title: 'Educação em Saúde',
        sections: [
          {
            heading: 'A Importância da Informação',
            text: 'O acesso a informações baseadas em evidências científicas é o primeiro passo para o engajamento do paciente. A educação em saúde reduz internações e melhora a adesão ao tratamento.',
          },
        ],
      };
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={article.image} style={styles.headerImage} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{article.title}</Text>
          
          {/* Tag de Validação Acadêmica */}
          <View style={styles.validationBadge}>
            <Text style={styles.validationText}>Conteúdo baseado nas diretrizes da SBC e SBD</Text>
          </View>

          {article.sections.map((section, index) => (
            <View key={index} style={styles.sectionContainer}>
              <Text style={styles.sectionHeading}>{section.heading}</Text>
              <Text style={styles.sectionText}>{section.text}</Text>
            </View>
          ))}
          
          <View style={{ height: 40 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerImage: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    marginTop: -25,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -5 },
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 16,
    color: '#1F8E8A',
    textAlign: 'left',
    lineHeight: 30,
  },
  validationBadge: {
    backgroundColor: '#E0F2F1',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#1F8E8A',
  },
  validationText: {
    fontSize: 12,
    color: '#00695C',
    fontStyle: 'italic',
    fontWeight: '600',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeading: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold', 
    fontWeight: '700',
    marginBottom: 10,
    color: '#2C3E50',
    letterSpacing: 0.3,
  },
  sectionText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#4a5568',
    textAlign: 'justify',
    fontFamily: 'Poppins-Regular',
  },
});

export default ArticleDetailScreen;