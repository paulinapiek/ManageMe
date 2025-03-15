
  import { Story} from "./Story"
  export class StoryManager {
    private key: string = "stories";
  
    getStories(): Story[] {
      const data = localStorage.getItem(this.key);
      return data ? JSON.parse(data) : [];
    }
  
    addStory(story: Story): void {
      const stories = this.getStories();
      stories.push(story);
      localStorage.setItem(this.key, JSON.stringify(stories));
    }
  
    updateStory(updatedStory: Story): void {
      const stories = this.getStories().map(story => 
        story.id === updatedStory.id ? updatedStory : story
      );
      localStorage.setItem(this.key, JSON.stringify(stories));
    }
  
    deleteStory(storyId: string): void {
      const stories = this.getStories().filter(story => story.id !== storyId);
      localStorage.setItem(this.key, JSON.stringify(stories));
    }
  }
  