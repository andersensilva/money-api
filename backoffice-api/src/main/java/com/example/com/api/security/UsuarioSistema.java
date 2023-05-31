package com.example.com.api.security;

import com.example.com.api.model.Usuario;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

import org.springframework.security.core.userdetails.User;

public class UsuarioSistema extends User{

    private static final long serialVersionUID = 1l;

    private Usuario usuario;

    public UsuarioSistema(Usuario usuario, Collection<? extends GrantedAuthority> authorities){
        super(usuario.getEmail(), usuario.getSenha(), authorities);
        this.usuario = usuario;
    }

    public Usuario getUsuario(){
        return usuario;
    }
}
