<template>
    <div class="perfil-page">
        <header class="perfil-header-global">
            <h1>Perfil</h1>
        </header>

        <div class="perfil-container">
            <!-- Tarjeta principal (2/3 del espacio) -->
            <div class="perfil-card">
                <div class="perfil-card-header">Datos de usuario</div>
                <header class="perfil-card-header-content">
                    <div class="perfil-acento"></div>
                    <div class="perfil-nombre">{{ usuario.fullname }}</div>
                    <div class="perfil-username">@{{ usuario.username }}</div>
                    <div class="perfil-rol">{{ usuario.rol }}</div>
                </header>
                <div class="perfil-imagen">
                    <img :src="usuario.imagenPerfil" alt="Imagen de perfil" />
                </div>
            </div>

            <!-- Columna derecha con contacto y universidad -->
            <div class="perfil-derecha">
                <div class="contacto-card">
                    <div class="contacto-card-header">Datos de contacto</div>
                    <div class="contacto-detalles">
                        <p>
                            <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M4 4h16v16H4z" fill="none" />
                                <path d="M22 6v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2zm-2 0L12 13 4 6h16zm0 12V8l-8 5-8-5v10h16z" />
                            </svg>
                            <strong>Correo electrónico:</strong> {{ usuario.email }}
                        </p>
                        <p>
                            <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.11-.21 11.72 11.72 0 0 0 3.68.59 1 1 0 0 1 1 1v3.5a1 1 0 0 1-1 1A17 17 0 0 1 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.72 11.72 0 0 0 .59 3.68 1 1 0 0 1-.21 1.11l-2.2 2.2z" />
                            </svg>
                            <strong>Teléfono:</strong> {{ usuario.phone || 'No disponible' }}
                        </p>
                    </div>
                </div>

                <div class="universidad-favorita-card">
                    <div class="universidad-favorita-card-header">Universidad favorita</div>
                    <div class="universidad-favorita-card-body">
                        {{ usuario.universidadFavorita ? usuario.universidadFavorita : 'No tiene universidad favorita' }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.perfil-page {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    background-color: white;
    min-height: 100vh;
}

.perfil-header-global {
    width: 100%;
    border-bottom: 2px solid #e0e0e0;
    margin-bottom: 20px;
    padding-bottom: 10px;
    text-align: left;
}

.perfil-header-global h1 {
    font-size: 28px;
    font-weight: bold;
    color: #007acc;
    margin: 0;
}

.perfil-container {
    display: flex;
    gap: 20px;
    width: 100%;
    align-items: flex-start;
}

.perfil-card {
    flex: 2 1 66%;
    min-width: 300px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

.perfil-derecha {
    flex: 1 1 34%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-width: 250px;
}

.contacto-card,
.universidad-favorita-card {
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 15px;
}

.perfil-card-header,
v .contacto-card-header,
.universidad-favorita-card-header {
    font-weight: bold;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e0e0e0;
}

.perfil-card-header {
    font-size: 20px;
    color: #007acc;
}

.contacto-card-header,
.universidad-favorita-card-header {
    font-size: 20px;
    color: #005999;
}

.perfil-card-header-content {
    display: flex;
    align-items: center;
    margin: 15px 0;
}

.perfil-acento {
    width: 4px;
    height: 35px;
    background: #007acc;
    margin-right: 12px;
    border-radius: 2px;
}

.perfil-nombre {
    font-size: 22px;
    font-weight: 600;
    color: #333;
    margin-right: 8px;
}

.perfil-username {
    font-size: 18px;
    color: #007acc;
    font-weight: 500;
}

.perfil-rol {
    margin-left: auto;
    font-size: 16px;
    font-weight: 600;
    color: #555;
}

.perfil-imagen img {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #007acc;
    margin-top: 10px;
}

.contacto-detalles {
    font-size: 14px;
    color: #444;
    line-height: 1.4;
}

.contacto-detalles p {
    display: flex;
    align-items: center;
    margin: 8px 0;
    padding: 6px 0;
    font-size: 16px;
    font-weight: bold;
}

.icon {
    width: 18px;
    height: 18px;
    margin-right: 8px;
    fill: #007acc;
}

.contacto-detalles strong {
    color: #005999;
    margin-right: 5px;
    font-size: 16px;
}

.universidad-favorita-card-body {
    font-size: 16px;
    color: #444;
}
</style>


<script>
export default {
    name: 'PerfilPage',
    data() {
        return {
            usuario: JSON.parse(localStorage.getItem('usuario')) || {},
        };
    },
};
</script>