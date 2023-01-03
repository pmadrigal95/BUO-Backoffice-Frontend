<script>
/**
 * Descripción: Botón con estilo de botones de social media
 *
 * @displayName BaseCustomIconButton
 */
export default {
    name: 'BaseCustomIconButton',
    props: {
        icon: {
            type: String,
            default: 'facebook',
        },

        color: {
            type: String,
            default: '#4267b2',
        },

        fn: {
            type: Function,
            required: true,
        },
    },
};
</script>

<template>
    <div class="ma-1 boxContainer" @click="fn">
        <div class="displayContainer">
            <v-icon :color="color">mdi-{{ icon }}</v-icon>
        </div>
    </div>
</template>

<style scoped>
.boxContainer {
    -webkit-border-radius: 4px;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition: background-color 0.218s, border-color 0.218s;
    transition: background-color 0.218s, border-color 0.218s;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dadce0;
    color: #dadce0;
    cursor: pointer;
    font-size: 14px;
    height: 40px;
    letter-spacing: 0.25px;
    outline: none;
    overflow: hidden;
    position: relative;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    padding: 0;
    width: 40px;
}

.boxContainer:hover {
    -webkit-box-shadow: none;
    box-shadow: none;
    border-color: #d2e3fc;
    outline: none;
    background: rgba(66, 133, 244, 0.04);
}

.displayContainer {
    margin-right: 8px;
    min-width: 18px;
    width: 18px;
    margin: 0;
    padding: 7px;
    display: block;
}
</style>
