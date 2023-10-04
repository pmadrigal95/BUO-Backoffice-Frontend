<script>
/**
 * Descripción: Pantalla BaseCardSignUpCompanyCode
 *
 * @displayName BaseCardSignUpCompanyCode
 *
 */

export default {
    name: 'BaseCardSignUpCompanyCode',

    props: {
        code: {
            type: String,
            required: true,
        },
    },
};
</script>

<template>
    <div>
        <p>{{ code }}</p>
    </div>
</template>
