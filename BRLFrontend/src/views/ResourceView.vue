<script setup lang="ts">
import Upvote from '@/components/Upvote.vue';
import CommentFlagList from '@/components/commentlist/CommentFlagList.vue';
import VueFeather from 'vue-feather';
import { onMounted, ref, watch } from 'vue'
import { Resource } from '@/types';
import { useRoute } from 'vue-router';
import CommentFlagEntry from '@/components/CommentFlagEntry.vue';
import { useResource } from '@/composables/useResource';
import { useUpvote } from '@/composables/useUpvote';

const resource = ref<Resource>();
const route = useRoute();
const commentsScrollTarget = ref<HTMLElement | null>(null);
const flagsScrollTarget = ref<HTMLElement | null>(null);
const activeTab = ref("comments");

const getResourceById = useResource().getResourceById;
const listAllResources = useResource().listAllResources;
const { createUpvote, deleteUpvote } = useUpvote();

const scrollToTabs = () => {
  if (activeTab.value == "comments") {
    if (commentsScrollTarget.value) {
        commentsScrollTarget.value.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
        });
    }
  } else if (activeTab.value == "flags") {
    if (flagsScrollTarget.value) {
        flagsScrollTarget.value.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
        });
    }
  }
};

const scrollToFlags = () => {
    activeTab.value = "flags";
    scrollToTabs();
}

const scrollToComments = () => {
    activeTab.value = "comments";
    scrollToTabs();
}

const handleUpvote = () => {
    if (resource.value) { 
        console.log(resource.value)
        if (resource.value.upvotedByCurrentUser && resource.value.currentUserUpvoteId != undefined) {
            deleteUpvote(
                resource.value.id,
                resource.value.currentUserUpvoteId,
                () => {
                    if (resource.value) {
                        resource.value.upvoteCount -= 1;
                        resource.value.upvotedByCurrentUser = false;
                    }
                },
                () => {}
            )
        } else if (!resource.value.upvotedByCurrentUser) {
            createUpvote(
                resource.value.id,
                (newId) => {
                    if (resource.value) {
                        resource.value.upvoteCount += 1;
                        resource.value.upvotedByCurrentUser = true;
                        resource.value.currentUserUpvoteId = newId;
                    }
                },
                () => {}
            )
        }
    }
}

function refresh() {
    getResourceById(
        Number(route.params.id),
        (res) => resource.value = res,
        (reason) => resource.value = undefined,
    )
}

watch(
    () => route.params.id,
    (newId, _oldId) => {
        getResourceById(
            Number(newId),
            (res) => resource.value = res,
            (reason) => resource.value = undefined,
        )
    }
)


onMounted(() => {
    refresh();
})
</script>

<template>
  <div v-if="resource != undefined" class="resource-view">
    <div class="flag-warning" v-if="resource.reviewFlags.length > 0" @click="refresh">
        <p v-if="resource.reviewFlags.length > 1">
            <b>Warning! This resource has been flagged {{ resource.reviewFlags.length }} times!</b>
        </p>
        <p v-if="resource.reviewFlags.length == 1">
            <b>Warning! This resource has been flagged {{ resource.reviewFlags.length }} time!</b>
        </p>
    </div>
    <h2 class="resource-title">{{ resource.title }}</h2>
    <div class="resource-action-row">
        <Upvote class="resource-action-item" :is-upvoted="resource.upvotedByCurrentUser" :count="resource.upvoteCount" @upvoted="handleUpvote"/>
        <div class="resource-action-item resource-comment-action">
            <button class="resource-comment-button" @click="scrollToComments">
                <VueFeather type="message-square"/>
            </button>
            {{ resource.comments.length }}
        </div>
        <div class="resource-action-item resource-flag-action">
            <button class="resource-flag-button" @click="scrollToFlags">
                <VueFeather type="flag"/>
            </button>
            {{ resource.reviewFlags.length }}
        </div>
        <!-- If we want a share button
        <div class="resource-share-action">
            <button class="resource-share-button">
                <VueFeather type="share-2"/>
            </button>
        </div> -->
    </div>
    <div class="resource-card">
        <div class="resource-metadata">
            <p class="resource-url">Link to resource: <a class="resource-url-link" :href="resource.url">{{ resource.url }}</a></p>
            <p class="resource-creator">Creator: {{ resource.firstName }} {{ resource.lastName }}</p><p class="resource-date">Created on: {{ resource.creationDate }}</p>
        </div>
        <p class="resource-description">{{ resource.description }}</p>
        <div class="resource-tabs">
            <button class="tab comment-tab" :class="{active: activeTab == 'comments'}" @click="activeTab = 'comments'">
                <VueFeather type="message-square"/>
                <p v-if="resource.comments.length == 1">{{ resource.comments.length }} Comment</p>
                <p v-else>{{ resource.comments.length }} Comments</p>
            </button>
            <button class="tab flag-tab" :class="{active: activeTab == 'flags'}" @click="activeTab = 'flags'">
                <VueFeather type="flag"/>
                <p v-if="resource.reviewFlags.length == 1">{{ resource.reviewFlags.length }} Flags</p>
                <p v-else>{{ resource.reviewFlags.length }} Flags</p>
            </button>
        </div>
    </div>
    <div class="comments-container" ref="commentsScrollTarget" v-show="activeTab == 'comments'">
        <CommentFlagEntry type="comment" :handle-successful-submit="refresh" :resource-id="resource.id"/>
        <CommentFlagList :records="resource.comments" />
    </div>
    <div class="flags-container" ref="flagsScrollTarget" v-show="activeTab == 'flags'">
        <CommentFlagEntry type="flag" :handle-successful-submit="refresh" :resource-id="resource.id"/>
        <CommentFlagList :records="resource.reviewFlags" />
    </div>
  </div>
  <p v-else>Resource not available</p>
</template>

<style scoped>
@import '../assets/animations.css';
@import '../assets/buttons.css';
@import './styles/ResourceView.css';
</style>
