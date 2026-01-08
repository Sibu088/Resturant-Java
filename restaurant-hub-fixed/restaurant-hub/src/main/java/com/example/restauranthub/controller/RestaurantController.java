package com.example.restauranthub.controller;

import com.example.restauranthub.entity.Restaurant;
import com.example.restauranthub.repository.RestaurantRepository;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/restaurants")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth") // 🔐 Swagger JWT support
@CrossOrigin(origins = "http://localhost:5173") // ⚛️ React frontend
public class RestaurantController {

    private final RestaurantRepository repository;

    // ✅ READ ALL
    @GetMapping
    public ResponseEntity<List<Restaurant>> getAll() {
        return ResponseEntity.ok(repository.findAll());
    }

    // ✅ READ ONE
    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> getById(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ CREATE
    @PostMapping
    public ResponseEntity<Restaurant> create(@RequestBody Restaurant restaurant) {
        Restaurant saved = repository.save(restaurant);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // ✅ UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Restaurant> update(
            @PathVariable Long id,
            @RequestBody Restaurant updatedRestaurant
    ) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setName(updatedRestaurant.getName());
                    existing.setLocation(updatedRestaurant.getLocation());
                    return ResponseEntity.ok(repository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
