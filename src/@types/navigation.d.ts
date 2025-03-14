// src/types/navigation.d.ts
export type AuthStackParamList = {
    PreLogin: undefined;
    Login: undefined;
    Register: undefined;
    ForgotPassword: undefined;
    
  };
  
  export type AppStackParamList = {
    
    Home: undefined;
    Topics: {
      category: string;
      title: string;
    };
    TopicDetail: {
      id: string;
      title: string;
    };
    ArticleDetail: {
      id: string;
    };
  };
