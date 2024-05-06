<script>
const PsychometricProfileViewComponent = () =>
    import('@/views/sandbox/components/PsychometricProfileViewComponent');
export default {
    name: 'Sandbox2',

    components: {
        PsychometricProfileViewComponent,
    },
};
</script>

<template>
    <div>
        <v-row>
            <v-col cols="12">
                <PsychometricProfileViewComponent
                    imageURL="https://buo-resources.s3.us-east-2.amazonaws.com/hotcakes_simple/SimpleHotcakeCautivador.svg"
                />
            </v-col>
        </v-row>
    </div>
</template>
