<script>
import Avatar from '@/components/core/avatars/BaseAvatar';
export default {
    name: 'GroupAvatar',
    components: {
        Avatar,
    },
    props: {
        max: {
            type: Number,
            default: 4,
        },
        avatars: {
            type: Array,
        },
        borderColor: {
            type: String,
            default: '#FFFFFF',
        },
    },
};
</script>

<template>
    <div class="group__avatar">
        <div class="_avatar" v-for="(avatar, index) in avatars" :key="index">
            <Avatar
                :object="avatar"
                v-if="index < parseInt(max)"
                :last="index + 1 == parseInt(max)"
                :more_avatars="
                    avatars.length == max
                        ? 1
                        : parseInt(avatars.length - max + 1)
                "
                :borderColor="borderColor"
            >
                <div slot="list">
                    <v-list-item v-for="item in avatars" :key="item.id">
                        <v-list-item-avatar size="30">
                            <v-img
                                max-height="100%"
                                max-width="100%"
                                contain
                                :src="item.src"
                                alt=""
                                v-if="item.src != null"
                            />
                            <v-avatar tile color="blue900" v-else>
                                <span class="white--text text-h5">{{
                                    item.text.charAt(0)
                                }}</span>
                            </v-avatar>
                        </v-list-item-avatar>
                        <v-list-item-content class="ms-n3">
                            <v-list-item-title
                                :class="[
                                    $vuetify.breakpoint.smAndDown
                                        ? 'BUO-Paragraph-Small'
                                        : 'BUO-Paragraph-Medium',
                                ]"
                                >{{ item.text }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </div>
            </Avatar>
        </div>
    </div>
</template>

<style lang="less" scoped>
.group__avatar {
    display: inline-flex;
    margin-left: 15px;
    .__avatar {
        margin-left: -15px;
    }
}
</style>
