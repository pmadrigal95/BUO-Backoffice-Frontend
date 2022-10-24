<script>
/**
 * Descripción: Alertas reutilizables
 *
 * @displayName BaseNotificationBar
 */

import { mapActions } from 'vuex';

export default {
    name: 'BaseNotificationBar',

    props: {
        /**
     * Objeto necesario para crear la notificación
     * {
          error: BOOLEAN,
          message: STRING,
          timer: NUMBER,
          requireTimer: BOOLEAN
        };
     */
        notification: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            timeout: null,
        };
    },

    mounted() {
        if (this.notification?.requireTimer) {
            this.timeout = setTimeout(
                () => this.remove(this.notification),
                this.notification?.timer ? this.notification.timer : 5000
            );
        }
    },

    beforeDestroy() {
        clearTimeout(this.timeout);
    },

    methods: {
        ...mapActions('notification', ['remove']),

        /**
         * Método click
         */
        $_remove() {
            this.remove(this.notification);
        },
    },
};
</script>

<template>
    <div class="alert">
        <v-alert
            @click="$_remove"
            border="left"
            prominent
            colored-border
            dark
            :type="notification.error ? 'error' : 'success'"
            :icon="
                notification.error
                    ? 'mdi-sticker-alert-outline'
                    : 'mdi-sticker-check-outline'
            "
            >{{ notification.message }}
            <template v-slot:append>
                <v-icon :color="notification.error ? 'error' : 'success'">
                    mdi-close-circle-outline
                </v-icon>
            </template>
        </v-alert>
    </div>
</template>

<style scoped>
.notification-bar {
    margin: 1em 0 1em;
    background-color: white;
}

.alert:hover {
    cursor: pointer;
}
</style>
