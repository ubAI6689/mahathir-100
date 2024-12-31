// Remove this test block since we have testConnection() method in the class
class VotingSystem {
    constructor() {
        this.hasVoted = localStorage.getItem('hasVoted');
        this.setupVoteButtons();
        this.fetchVotes();
        this.setupRealtimeSubscription();
    }

    async testConnection() {
        try {
            const { count, error } = await supabaseClient
                .from('votes')
                .select('*', { count: 'exact' });
            
            if (error) throw error;
            console.log('Connection successful, vote count:', count);
        } catch (error) {
            console.error('Connection error:', error);
        }
    }

    setupVoteButtons() {
        const voteYes = document.getElementById('voteYes');
        const voteNo = document.getElementById('voteNo');

        if (this.hasVoted) {
            voteYes.disabled = true;
            voteNo.disabled = true;
        }

        voteYes.addEventListener('click', () => this.castVote('yes'));
        voteNo.addEventListener('click', () => this.castVote('no'));
    }

    async castVote(voteType) {
        if (this.hasVoted) return;
    
        try {
            const { error } = await supabaseClient
                .from('votes')
                .insert([{ vote_type: voteType }]);
    
            if (error) throw error;
    
            localStorage.setItem('hasVoted', 'true');
            document.getElementById('voteYes').disabled = true;
            document.getElementById('voteNo').disabled = true;
            
            // Add this line to fetch updated votes immediately
            await this.fetchVotes();
            
        } catch (error) {
            console.error('Error casting vote:', error);
        }
    }

    async fetchVotes() {
        try {
            const { data, error } = await supabaseClient
                .from('vote_counts')
                .select('*')
                .single();

            if (error) throw error;
            this.updateUI(data);
        } catch (error) {
            console.error('Error fetching votes:', error);
        }
    }

    setupRealtimeSubscription() {
        supabaseClient
            .channel('vote_changes')
            .on('postgres_changes', 
                { event: '*', schema: 'public', table: 'votes' }, 
                () => this.fetchVotes()
            )
            .subscribe();
    }

    updateUI(data) {
        const { yes_votes, total_votes } = data;
        const yesPercentage = total_votes === 0 ? 0 : (yes_votes / total_votes) * 100;

        document.getElementById('yesBar').style.width = `${yesPercentage}%`;
        document.getElementById('yesCount').textContent = yes_votes;
        document.getElementById('totalVotes').textContent = total_votes;
    }
}

// Initialize and test
document.addEventListener('DOMContentLoaded', () => {
    const votingSystem = new VotingSystem();
    votingSystem.testConnection();
});