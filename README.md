# 📱 App Educativo em Saúde

Aplicativo móvel desenvolvido com React Native e Expo, focado na educação em saúde para pacientes com **Diabetes Tipo 1 e Tipo 2** e **Doenças Cardiovasculares**. O app oferece conteúdos educativos, sistema de gamificação, registro de indicadores de saúde e integração com o **Health Connect** para sincronização de dados de passos, batimentos cardíacos e sono.

## 🧠 Objetivo

Promover a educação em saúde e o autocuidado, fornecendo informações relevantes, acompanhamento de indicadores de saúde e incentivo à adoção de hábitos saudáveis.

## 🚀 Tecnologias Utilizadas

- [React Native](https://reactnative.dev/) com [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Firebase Authentication](https://firebase.google.com/products/auth)
- [Firebase Firestore](https://firebase.google.com/products/firestore)
- [Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [React Navigation](https://reactnavigation.org/)
- [Health Connect](https://developer.android.com/health-and-fitness/guides/health-connect)

## 🎯 Funcionalidades

- **Autenticação** com Firebase  
- **Conteúdo educativo** sobre doenças crônicas  
- **Gamificação** com pontos e progresso visual  
- **Alertas personalizados** com notificações locais  
- **Registro de indicadores de saúde** com histórico  
- **Notificações motivacionais** diárias  
- **Sincronização com Health Connect**  
- **Suporte via WhatsApp e e-mail**  

## 🗂️ Estrutura de Pastas

```
App-Educativo/
├── src/
│   ├── components/         # Componentes reutilizáveis
│   ├── contexts/           # Contextos de autenticação e dados
│   ├── data/               # Dados estáticos e mocks
│   ├── navigation/         # Rotas e navegação
│   ├── screens/            # Telas do app
│   ├── services/           # Firebase, Health Connect e APIs
│   └── styles/             # Estilos globais
├── App.tsx                 # Entrada principal do app
├── app.json                # Configuração do Expo
├── package.json            # Dependências e scripts
└── README.md               # Documentação do projeto
```

## 📦 Instalação

### 1. Clone o repositório
```bash
git clone https://github.com/wendel211/App-Educativo.git
cd App-Educativo
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o Firebase
1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
2. Ative **Authentication (E-mail/Senha)**
3. Ative **Firestore Database**
4. Faça o download do arquivo `google-services.json` (Android) e coloque em `./android/app/`

## ▶️ Execução

### Modo de Desenvolvimento (Expo Go)
```bash
npx expo start
```
Escaneie o QR Code exibido no terminal ou navegador usando o app **Expo Go** no seu dispositivo Android/iOS.

### Execução com Health Connect (Build Nativo Android)

> ⚠️ **Atenção:** Para utilizar a integração com o Health Connect, é necessário rodar o app em **build nativo Android**!

#### 1. Faça o prebuild
```bash
npx expo prebuild
```

#### 2. Instale os pacotes necessários
```bash
npm install react-native-health-connect expo-health-connect
npm install expo-build-properties --save-dev
```

#### 3. Configure o arquivo `app.json`
Adicione/ajuste os plugins no seu `app.json`:

```json
{
  "expo": {
    "plugins": [
      "expo-health-connect",
      [
        "expo-build-properties",
        {
          "android": {
            "compileSdkVersion": 34,
            "targetSdkVersion": 34,
            "minSdkVersion": 26
          }
        }
      ]
    ]
  }
}
```

#### 4. Gere o build e execute no Android
```bash
npx expo prebuild --clean
npx expo run:android
```

## 🔗 Integração com Health Connect

1. Instale o app **Health Connect** no seu dispositivo Android ([Google Play Store](https://play.google.com/store/apps/details?id=com.google.android.apps.healthdata))
2. Abra o Health Connect e aceite todas as permissões solicitadas
3. No **App Educativo**, acesse a tela de indicadores de saúde
4. Toque em **"Sincronizar Dados"** para importar passos, batimentos e sono
5. Pronto! Seus dados aparecerão automaticamente nos cards do app

## 📱 Capturas de Tela

_Em breve serão adicionadas capturas de tela das principais funcionalidades do aplicativo._

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença **MIT**.  
Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🏥 Sobre o Projeto

Este aplicativo foi desenvolvido como parte de um projeto educativo voltado para a promoção da saúde e prevenção de doenças crônicas. O objetivo é empoderar os usuários com conhecimento e ferramentas para um melhor autocuidado.

> **Disclaimer:** Este aplicativo é para fins educativos e não substitui o acompanhamento médico profissional. Sempre consulte um profissional de saúde para orientações específicas sobre sua condição.
