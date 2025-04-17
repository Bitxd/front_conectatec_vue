<template>
    <div v-if="visible" class="modal-container">
      <div class="modal">
        <h3 class="title">{{ titulo }}</h3>
        <p class="mensaje">{{ mensaje }}</p>
        <div class="botones">
          <button class="btn btn-confirmar" @click="confirmar">Sí</button>
          <button class="btn btn-cancelar" @click="cancelar">No</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ConfirmacionComponent',
    props: {
      visible: Boolean,
      titulo: String,
      mensaje: String,
    },
    emits: ['confirmar', 'cancelar'],
    methods: {
      confirmar() {
        console.log("ConfirmacionComponent: botón confirmar clickeado");
        this.$emit('confirmar');
      },
      cancelar() {
        console.log("ConfirmacionComponent: botón cancelar clickeado");
        this.$emit('cancelar');
      }
    }
  }
  </script>
  
  <style>
  .modal-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10000;
    /* No se define fondo para ver el contenido tras el modal */
  }
  
  .modal {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    border: 2px solid #007bff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    width: 300px;
    text-align: center;
  }
  
  .title {
    color: #2d3748;
    font-size: 18px;
    margin-bottom: 10px;
  }
  
  .mensaje {
    color: #4a5568;
    margin-bottom: 20px;
  }
  
  .botones {
    display: flex;
    justify-content: space-between;
  }
  
  .btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  
  .btn:hover {
    opacity: 0.9;
  }
  
  .btn-confirmar {
    background-color: #28a745;
    color: #fff;
  }
  
  .btn-cancelar {
    background-color: #dc3545;
    color: #fff;
  }
  </style>
  