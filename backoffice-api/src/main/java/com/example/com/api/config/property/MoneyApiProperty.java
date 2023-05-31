package com.example.com.api.config.property;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties("money")
public class MoneyApiProperty {

    private String originPermitida = "http://localhost:8000";
    private final Seguranca seguranca = new Seguranca();

    public Seguranca getSeguranca() {
        return seguranca;
    }

    public String getOriginPermitida() {
        return originPermitida;
    }

    public void setOriginPermitida(String originPermitida) {
        this.originPermitida = originPermitida;
    }

    public static class Seguranca {
        private Boolean enableHttps;

        public Boolean isEnableHttps() {
            return enableHttps;
        }

        public void setEnableHttps(Boolean enableHttps) {
            this.enableHttps = enableHttps;
        }
    }

}
