package com.example.com.api.resource;

import java.net.URI;
import java.util.List;
import java.util.Optional;


import javax.validation.Valid;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.com.api.repository.CategoriaRepository;

import javax.servlet.http.HttpServletResponse;

import com.example.com.api.event.RecursoCriadoEvent;
import com.example.com.api.model.Categoria;

@RestController
@RequestMapping("/categorias")
public class CategoriaResource {
	
	@Autowired
	private CategoriaRepository categoriaRepository;
	
	@Autowired
	private ApplicationEventPublisher publisher;

	@GetMapping
	public List<Categoria> listar(){
		return categoriaRepository.findAll();		
	}
	
	@PostMapping
	public ResponseEntity<Categoria> criar(
		@Valid @RequestBody Categoria categoria,
		HttpServletResponse response
	) {
		Categoria categoriaSalva = categoriaRepository.save(categoria);
		publisher.publishEvent(new RecursoCriadoEvent(this, response, categoriaSalva.getCodigo()));
		
		return ResponseEntity.status(HttpStatus.CREATED).body(categoriaSalva);
	}
	
	@GetMapping("/{codigo}")
	public ResponseEntity<Categoria> buscarPeloCodigo(
		@PathVariable Long codigo
	) {
		Categoria categoria = categoriaRepository.findById(codigo).get();
		return categoria != null ? ResponseEntity.ok(categoria) : ResponseEntity.notFound().build();
	}
	
}
