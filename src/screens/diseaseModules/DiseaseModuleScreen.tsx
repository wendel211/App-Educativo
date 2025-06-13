import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
  Image,
  Platform,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useModuleProgress } from '../../hooks/useModuleProgress';
import { colors } from '../../styles/colors';
import { diseaseModules } from '../../data/diseaseModules';

const { width } = Dimensions.get('window');

// Types
interface ContentBlock {
  type: 'title' | 'subtitle' | 'paragraph' | 'list' | 'image' | 'video';
  text?: string;
  items?: string[];
  src?: any;
  alt?: string;
}
interface RouteParams {
  diseaseId: string;
  moduleIndex: number;
}
interface QuizAnswer {
  questionIndex: number;
  selected: string;
  correct: boolean;
}

// Block Components
const TitleBlock = ({ text }: { text?: string }) => (
  <View style={styles.titleContainer}>
    <Text style={styles.title}>{text}</Text>
    <View style={styles.underline} />
  </View>
);

const SubtitleBlock = ({ text }: { text?: string }) => (
  <View style={styles.subtitleContainer}>
    <View style={styles.bar} />
    <Text style={styles.subtitle}>{text}</Text>
  </View>
);

const ParagraphBlock = ({ text }: { text?: string }) => (
  <Text style={styles.paragraph}>{text}</Text>
);

const ListBlock = ({ items }: { items?: string[] }) => (
  <View style={styles.listWrapper}>
    {items?.map((item, idx) => (
      <View key={idx} style={styles.listItem}>
        <View style={styles.bullet} />
        <Text style={styles.listText}>{item}</Text>
      </View>
    ))}
  </View>
);

const ImageBlock = ({ src, alt }: { src?: any; alt?: string }) => (
  <View style={styles.imageWrapper}>
    <Image
      source={typeof src === 'string' ? { uri: src } : src}
      style={styles.image}
      resizeMode="cover"
    />
    {alt && <Text style={styles.caption}>{alt}</Text>}
  </View>
);

const VideoBlock = ({ url }: { url?: string }) => (
  <TouchableOpacity style={styles.videoBtn} onPress={() => url && Linking.openURL(url)}>
    <Ionicons name="play-circle-outline" size={20} color="#fff" />
    <Text style={styles.videoText}>Assistir Vídeo</Text>
  </TouchableOpacity>
);

// Not Found Component
const NotFound = ({ onBack }: { onBack: () => void }) => (
  <SafeAreaView style={styles.notFoundContainer}>
    <View style={styles.notFoundCenter}>
      <Ionicons name="alert-circle-outline" size={60} color={colors.primary} />
      <Text style={styles.notFoundTitle}>Conteúdo não encontrado</Text>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Text style={styles.backBtnText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

// Header Component
const Header = ({ title, type, done, onBack }: any) => {
  const subtitle =
    type === 'learn' ? 'Conteúdo Educativo' :
    type === 'quiz' ? 'Quiz Interativo' : 'Hábitos Saudáveis';

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.backIcon}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <View style={styles.headerInfo}>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerSubtitle}>{subtitle}</Text>
      </View>
      {done && (
        <Ionicons name="checkmark-circle" size={24} color={colors.secondary} />
      )}
    </View>
  );
};

// Learn Content
const LearnContent = ({ blocks, videoUrl, references }: any) => (
  <View style={styles.card}>
    {blocks?.map((b: ContentBlock, i: number) => {
      switch (b.type) {
        case 'title': return <TitleBlock key={i} text={b.text} />;
        case 'subtitle': return <SubtitleBlock key={i} text={b.text} />;
        case 'paragraph': return <ParagraphBlock key={i} text={b.text} />;
        case 'list': return <ListBlock key={i} items={b.items} />;
        case 'image': return <ImageBlock key={i} src={b.src} alt={b.alt} />;
        case 'video': return <VideoBlock key={i} url={b.src as string} />;
        default: return null;
      }
    })}
    {videoUrl && <VideoBlock url={videoUrl} />}
    {references?.length > 0 && (
      <View style={styles.refsSection}>
        <Ionicons name="library" size={18} color={colors.primary} />
        <Text style={styles.refsTitle}>Referências</Text>
        {references.map((ref: string, idx: number) => (
          <TouchableOpacity key={idx} style={styles.refItem} onPress={() => Linking.openURL(ref)}>
            <Text style={styles.refText}>{ref.replace(/^https?:\/\//, '')}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )}
  </View>
);

// Quiz Content
const QuizContent = ({ questions, answers, onAnswer, progress, done }: any) => {
  const { answeredQ, totalQ } = progress;
  return (
    <View style={styles.card}>
      <Text style={styles.quizHeaderText}>Quiz Interativo</Text>
      <Text style={styles.progressText}>{answeredQ} / {totalQ} respondidas</Text>
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: `${(answeredQ/ totalQ)*100}%` }]} />
      </View>
      {questions?.map((q: any, idx: number) => {
        const ans = answers.find((a: QuizAnswer) => a.questionIndex === idx);
        return (
          <View key={idx} style={styles.questionCard}>
            <View style={styles.questionHeader}>
              <Text style={styles.questionNumber}>Questão {idx+1}</Text>
              {ans && (
                <Ionicons
                  name={ans.correct? 'checkmark-circle' : 'close-circle'}
                  size={20}
                  color={ans.correct? '#26946B' : '#E74C3C'}
                />
              )}
            </View>
            <Text style={styles.questionText}>{q.question}</Text>
            {q.options.map((opt: string, oidx: number) => (
              <TouchableOpacity
                key={oidx}
                style={[
                  styles.optionBtn,
                  ans?.selected === opt && styles.optionSelected,
                  ans && opt === q.correctAnswer && styles.optionCorrect,
                  ans && ans.selected === opt && !ans.correct && styles.optionIncorrect,
                ]}
                onPress={() => onAnswer(idx, opt, q.correctAnswer)}
              >
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      })}
      {done && (
        <View style={styles.quizDoneBox}>
          <Ionicons name="trophy" size={32} color="#FFD700" />
          <Text style={styles.quizDoneText}>Parabéns! Quiz concluído.</Text>
        </View>
      )}
    </View>
  );
};

// Habits Content
const HabitsContent = ({ list }: any) => (
  <View style={styles.card}>
    <Text style={styles.habitsHeaderText}>Hábitos Recomendados</Text>
    {list?.map((h: string, idx: number) => (
      <View key={idx} style={styles.habitItem}>
        <Ionicons name="leaf" size={18} color={colors.secondary} />
        <Text style={styles.habitText}>{h}</Text>
      </View>
    ))}
  </View>
);

// Footer
const Footer = ({ done, onComplete }: any) => (
  <View style={styles.footer}>
    {!done ? (
      <TouchableOpacity style={styles.completeBtn} onPress={onComplete}>
        <Ionicons name="checkmark-done-outline" size={20} color="#fff" />
        <Text style={styles.completeBtnText}>Marcar como concluído</Text>
      </TouchableOpacity>
    ) : (
      <View style={styles.doneBox}>
        <Ionicons name="checkmark-circle" size={28} color={colors.secondary} />
        <Text style={styles.doneText}>Módulo concluído</Text>
      </View>
    )}
  </View>
);

// Main Export
const DiseaseModuleScreen: React.FC = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const { diseaseId, moduleIndex } = params as RouteParams;
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const { isCompleted, markAsCompleted } = useModuleProgress();

  useFocusEffect(
    useCallback(() => setAnswers([]), [])
  );

  const module = diseaseModules[diseaseId]?.modules[moduleIndex];
  if (!module) return <NotFound onBack={() => navigation.goBack()} />;

  const handleAnswer = (qi: number, sel: string, corr: string) => {
    const correct = sel === corr;
    setAnswers(prev => [
      ...prev.filter(a => a.questionIndex !== qi),
      { questionIndex: qi, selected: sel, correct }
    ]);
    Alert.alert(correct ? '✔️ Correto' : '❌ Incorreto', correct ? 'Parabéns!' : 'Tente novamente.');
  };

  const handleComplete = async () => {
    try {
      await markAsCompleted(diseaseId, moduleIndex);
      Alert.alert('🎉 Concluído!', '', [{ text: 'Voltar', onPress: () => navigation.goBack() }]);
    } catch {
      Alert.alert('Erro', 'Falha ao salvar progresso.');
    }
  };

  const totalQ = module.questions?.length || 0;
  const answeredQ = answers.length;
  const correctQ = answers.filter(a => a.correct).length;
  const quizDone = answeredQ === totalQ && correctQ === totalQ;

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={module.title}
        type={module.type}
        done={isCompleted(diseaseId, moduleIndex)}
        onBack={() => navigation.goBack()}
      />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {module.type === 'learn' && (
          <LearnContent blocks={module.content} videoUrl={module.videoUrl} references={module.references} />
        )}
        {module.type === 'quiz' && (
          <QuizContent
            questions={module.questions}
            answers={answers}
            onAnswer={handleAnswer}
            progress={{ answeredQ, totalQ }}
            done={quizDone}
          />
        )}
        {module.type === 'habits' && <HabitsContent list={module.checklist} />}
        <Footer done={isCompleted(diseaseId, moduleIndex)} onComplete={handleComplete} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DiseaseModuleScreen;

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scroll: {},
  contentContainer: { padding: 20, paddingBottom: 40 },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingTop: Platform.OS === 'android' ? 48 : 24,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  backIcon: { marginRight: 12 },
  headerInfo: { flex: 1 },
  headerTitle: { color: '#fff', fontSize: 18, fontFamily: 'Poppins-Bold' },
  headerSubtitle: { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 2 },

  // Not Found
  notFoundContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  notFoundCenter: { alignItems: 'center' },
  notFoundTitle: { fontSize: 20, color: colors.primary, marginTop: 12 },
  backBtn: { marginTop: 20, backgroundColor: colors.primary, padding: 12, borderRadius: 12 },
  backBtnText: { color: '#fff', fontFamily: 'Poppins-SemiBold' },

  // Generic Card
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },

  // Title & Subtitle Blocks
  titleContainer: { marginBottom: 16 },
  title: { fontSize: 22, color: colors.primary, fontFamily: 'Poppins-Bold' },
  underline: { width: 40, height: 4, backgroundColor: colors.primary, marginTop: 4, borderRadius: 2 },
  subtitleContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 12 },
  bar: { width: 4, height: 20, backgroundColor: colors.secondary, marginRight: 8, borderRadius: 2 },
  subtitle: { fontSize: 18, color: colors.secondary, fontFamily: 'Poppins-SemiBold' },

  // Paragraph & List
  paragraph: { fontSize: 16, lineHeight: 24, color: '#4A5568', marginBottom: 12, fontFamily: 'Poppins-Regular' },
  listWrapper: { marginVertical: 12 },
  listItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  bullet: { width: 6, height: 6, backgroundColor: colors.primary, borderRadius: 3, marginRight: 8, marginTop: 6 },
  listText: { flex: 1, fontSize: 16, fontFamily: 'Poppins-Regular' },

  // Image
  imageWrapper: { marginVertical: 16, alignItems: 'center' },
  image: { width: width - 40, height: 200, borderRadius: 12, backgroundColor: '#E2E8F0' },
  caption: { fontSize: 14, color: '#718096', marginTop: 8, fontStyle: 'italic', fontFamily: 'Poppins-Italic' },

  // Video
  videoBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primary, padding: 12, borderRadius: 12, marginVertical: 12 },
  videoText: { color: '#fff', marginLeft: 8, fontFamily: 'Poppins-Medium' },

  // References
  refsSection: { marginTop: 20, padding: 12, backgroundColor: '#F7FAFC', borderRadius: 8 },
  refsTitle: { fontSize: 16, color: colors.primary, fontFamily: 'Poppins-SemiBold', marginBottom: 8 },
  refItem: { marginBottom: 6 },
  refText: { fontSize: 14, color: colors.primary, fontFamily: 'Poppins-Regular' },

  // Quiz
  quizHeaderText: { fontSize: 20, color: colors.primary, fontFamily: 'Poppins-Bold', marginBottom: 12 },
  progressText: { fontSize: 14, color: '#718096', marginBottom: 8, fontFamily: 'Poppins-Regular' },
  progressBarBg: { height: 8, backgroundColor: '#E2E8F0', borderRadius: 4, overflow: 'hidden', marginBottom: 16 },
  progressBarFill: { height: '100%', backgroundColor: colors.secondary, borderRadius: 4 },
  questionCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 10, elevation: 3 },
  questionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  questionNumber: { fontSize: 16, color: colors.primary, fontFamily: 'Poppins-SemiBold' },
  questionText: { fontSize: 16, color: '#4A5568', fontFamily: 'Poppins-Regular' },
  optionBtn: { backgroundColor: '#EDF2F7', borderRadius: 8, padding: 12, borderWidth: 1, borderColor: '#CBD5E0', marginTop: 8 },
  optionSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  optionCorrect: { backgroundColor: '#C6F6D5', borderColor: '#48BB78' },
  optionIncorrect: { backgroundColor: '#FED7D7', borderColor: '#F56565' },
  optionText: { fontSize: 16, color: '#2D3748', fontFamily: 'Poppins-Regular' },
  quizDoneBox: { backgroundColor: '#F0FFF4', borderRadius: 12, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 },
  quizDoneText: { fontSize: 16, color: '#48BB78', fontFamily: 'Poppins-SemiBold', marginLeft: 8 },

  // Habits
  habitsHeaderText: { fontSize: 20, color: colors.primary, fontFamily: 'Poppins-Bold', marginBottom: 12 },
  habitItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  habitText: { fontSize: 16, color: '#4A5568', fontFamily: 'Poppins-Regular', marginLeft: 8 },

  // Footer
  footer: { padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#E2E8F0', alignItems: 'center' },
  completeBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.secondary, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 },
  completeBtnText: { color: '#fff', fontSize: 16, fontFamily: 'Poppins-SemiBold', marginLeft: 8 },
  doneBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#C6F6D5', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 },
  doneText: { fontSize: 16, color: '#48BB78', fontFamily: 'Poppins-SemiBold', marginLeft: 8 },
});
