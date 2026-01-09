package com.wendel.educacarioplus;

import android.os.Bundle;
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(null);
    }

    @Override
    protected String getMainComponentName() {
        return "main"; // Se seu index.js registra com outro nome, troque aqui.
    }
}
