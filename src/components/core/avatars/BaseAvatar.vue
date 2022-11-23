<script>
export default {
    name: 'Avatar',
    props: {
        object: {
            type: Object,
            required: true,
        },
        last: {
            type: Boolean,
            default: false,
        },
        more_avatars: {
            type: Number,
            default: 0,
        },
        borderColor: {
            type: String,
        },
        cardTitle: {
            type: String,
            default: 'Validado por:',
        },
    },
};
</script>

<template>
    <div class="__avatar" :style="[{ border: `2px solid ${borderColor}` }]">
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-img
                    :src="object.src"
                    alt=""
                    v-if="object.src != null"
                    v-bind="attrs"
                    v-on="on"
                    max-height="100%"
                    max-width="100%"
                    contain
                />
                <v-avatar tile color="blue900" v-else v-bind="attrs" v-on="on">
                    <span class="white--text">{{ object.text.charAt(0) }}</span>
                </v-avatar>
            </template>
            <span>{{ object.text }}</span>
        </v-tooltip>
        <v-menu top :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
                <div
                    v-if="last"
                    class="__panel_show_more"
                    v-bind="attrs"
                    v-on="on"
                >
                    <div>+{{ more_avatars }}</div>
                </div>
            </template>

            <v-card dark max-height="300" class="rounded-lg">
                <v-card-title
                    :class="[
                        $vuetify.breakpoint.smAndDown
                            ? 'BUO-Paragraph-Small'
                            : 'BUO-Paragraph-Medium',
                    ]"
                    >{{ cardTitle }}</v-card-title
                >
                <v-divider></v-divider>
                <v-card-text>
                    <slot name="list"></slot>
                </v-card-text>
            </v-card>
        </v-menu>
    </div>
</template>

<style lang="less" scoped>
.__avatar {
    width: 25px;
    height: 25px;
    border-radius: 40px;
    overflow: hidden;
    border: 2px solid white;
    transition: all 0.25s ease;
    z-index: 2;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .__panel_show_more {
        cursor: pointer;
        position: absolute;
        background-color: rgba(10, 12, 18, 0.5);
        width: 100%;
        height: 100%;
        z-index: 3;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
    }
    &:hover {
        -webkit-transform: translate(-3px);
        transform: translate(-3px);
    }
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
}

.v-card {
    display: flex !important;
    flex-direction: column;
}

.v-card__text {
    flex-grow: 1;
    overflow: auto;
}
</style>
