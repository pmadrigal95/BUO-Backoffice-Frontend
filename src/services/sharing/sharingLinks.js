/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share
 *
 * */

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';
import baseLocalHelper from '@/helpers/baseLocalHelper';

function shareLink(link, title, component, useNavigatorShare) {
    if (navigator.canShare && navigator.share && useNavigatorShare) {
        navigator
            .share({
                title: title,
                url: link,
            })
            .then(() => {
                console.log('Thanks for sharing!');
            })
            .catch((error) => {
                if (error.name !== 'AbortError') {
                    console.error(error.name, error.message);
                    baseNotificationsHelper.Message(
                        true,
                        baseLocalHelper.$_MsgErrorAndRetry
                    );
                }
            });
    } else {
        component();
    }
}

function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);

        if (successful) {
            baseNotificationsHelper.Message(
                false,
                baseLocalHelper.$_MsgGenericSuccess
            );
        }
    } catch (err) {
        baseNotificationsHelper.Message(
            true,
            'Fallback: Oops, unable to copy',
            err
        );
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(
        function () {
            baseNotificationsHelper.Message(
                false,
                baseLocalHelper.$_MsgGenericSuccess
            );
            console.log('Async: Copying to clipboard was successful!');
        },
        function (err) {
            baseNotificationsHelper.Message(
                true,
                'Async: Could not copy text: ',
                err
            );
            console.error('Async: Could not copy text: ', err);
        }
    );
}

export default {
    $_share(link, title, component, useNavigatorShare) {
        shareLink(link, title, component, useNavigatorShare);
    },

    $_copyLink(link) {
        copyTextToClipboard(link);
    },
};